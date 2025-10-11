# Application Architecture

This document provides a high-level overview of the technical architecture for the Shipping Battlefield application.

## 1. Core Technologies

- **Framework**: [Next.js](https://nextjs.org/) (App Router) with React and TypeScript.
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend Services**: [Firebase](https://firebase.google.com/) (Authentication, Firestore, Storage, Cloud Functions)
- **Task Queue**: [Google Cloud Tasks](https://cloud.google.com/tasks)

---

## 2. Frontend Architecture

The frontend is built as a modern, server-aware React application using the Next.js App Router.

- **Component Model**: Primarily uses React Server Components (RSC) for performance, with Client Components (`"use client"`) only used for pages and components requiring interactivity, state, and browser-only APIs (e.g., forms, event handlers, lifecycle hooks).
- **Routing**: File-system based routing provided by the Next.js `app` directory. Dynamic routes are used for detailed views (e.g., `/dashboard/shipment/[id]`).
- **Styling**: Utility-first styling is handled by Tailwind CSS. The overall theme (colors, radius, etc.) is configured in `tailwind.config.ts` and `src/app/globals.css`, leveraging ShadCN's CSS variable system for light and dark modes.
- **State Management**:
  - **Component State**: Managed via React hooks (`useState`, `useEffect`).
  - **Global State**: No global state management library is used. User session data is managed via Firebase's `onAuthStateChanged` listener, with user data and type being fetched from Firestore and passed down through props or re-fetched in specific components.
- **Authentication Flow**:
  - Client-side listeners (`onAuthStateChanged`) redirect users based on their authentication state and user type (`exporter`, `carrier`, `employee`).
  - The `/dashboard` page acts as a redirect hub, sending users to their specific dashboard (`/dashboard/exporter`, `/dashboard/carrier`, etc.).

---

## 3. Backend Architecture

The backend is a serverless architecture built entirely on Google Cloud and Firebase services.

### 3.1. Firebase Services

- **Firebase Authentication**:
  - Manages user identity via email and password.
  - Custom user roles (`userType`) are not stored in Auth custom claims but in the user's Firestore document.

- **Cloud Firestore (Database)**:
  - The primary NoSQL database for the application.
  - **Data Structure**:
    - `/users/{userId}`: Stores public user information, including `userType`, `name`, `email`, and `verificationStatus`.
    - `/shipments/{shipmentId}`: Stores all details for a shipment, including its status, cargo info, and origin/destination. This document also holds details of the winning bid and carrier once awarded.
    - `/shipments/{shipmentId}/bids/{bidId}`: A subcollection storing all bids placed by carriers for a specific shipment.
    - `/shipments/{shipmentId}/register/{carrierId}`: A subcollection tracking which carriers have registered interest in a scheduled shipment.
    - `/shipments/{shipmentId}/documents/{documentId}`: A subcollection for managing documents related to an awarded shipment.
  - **Security**: Access control is managed via Firestore Security Rules (`firestore.rules`).

- **Firebase Storage**:
  - Used for storing user-uploaded files, primarily for the business verification process.
  - **Structure**: Files are stored in a structured path to ensure security and organization: `verification-documents/{userType}/{userId}/{docType}-{fileName}`.
  - **Security**: Access is controlled through Storage Security Rules (`storage.rules`), allowing authenticated users to write only to their own designated folders.

### 3.2. Firebase Cloud Functions

- **Location**: `functions/src/index.ts`
- **Purpose**: To run trusted backend code in response to Firestore events or direct HTTP calls.
- **Key Functions**:
  - `onShipmentWrite`: A Firestore trigger that executes whenever a shipment document is created or updated. Its primary role is to interface with Google Cloud Tasks to schedule or cancel the `executeShipmentGoLive` task based on the shipment's status and `goLiveAt` time.
  - `executeShipmentGoLive`: A secure HTTP-triggered function invoked by Google Cloud Tasks. It updates a shipment's status from `scheduled` to `live`, making it available for bidding.
  - `hourlyShipmentSweeper`: A scheduled function (`onSchedule`) that runs every hour as a fail-safe to find and update any shipments that should have gone live but were missed.

### 3.3. Google Cloud Tasks

- **Purpose**: Used for scheduling future, asynchronous actions in a reliable and durable way.
- **Workflow**:
  1. An exporter creates or updates a shipment with a future `goLiveAt` timestamp and a `scheduled` status.
  2. The `onShipmentWrite` Cloud Function is triggered.
  3. The function creates a new task in the Google Cloud Tasks queue, with its execution time set to the `goLiveAt` value. The task is configured to securely call the `executeShipmentGoLive` HTTP endpoint.
  4. At the scheduled time, Cloud Tasks invokes the function, which sets the shipment status to `live`.

---

## 4. Key Workflows

- **User Verification**:
  1. A new user signs up as an `exporter` or `carrier`.
  2. They are redirected to a form to submit their business details and upload verification documents (e.g., GST, PAN, license).
  3. The user's `verificationStatus` is set to `pending`.
  4. An `employee` reviews the pending users in the Verification Center, previews the documents, and updates their status to `approved` or `rejected`.

- **Shipment Lifecycle**:
  1. **Draft**: An exporter creates a shipment request. It is only visible to them.
  2. **Scheduled**: The exporter sets a future "go-live" time for the shipment. The `onShipmentWrite` function creates a corresponding Cloud Task. Carriers can see the shipment and register their interest to bid.
  3. **Live**: The Cloud Task triggers, setting the status to `live`. The shipment is now open for bidding.
  4. **Awarded**: The exporter reviews the bids and accepts one. The shipment status is updated to `awarded`, and the winning carrier's details are stored on the shipment document.
  5. **Documents**: Once awarded, both the exporter and the winning carrier can access a shared document center for that shipment.
