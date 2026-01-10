
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-3">
        <h2 className="text-2xl font-bold font-headline pt-6 border-t">{title}</h2>
        <div className="space-y-4 text-muted-foreground">
            {children}
        </div>
    </div>
);

const SubSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-2 pl-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="space-y-2">{children}</div>
    </div>
);

export default function TermsOfServicePage() {
    return (
        <main className="flex-1">
            <section className="w-full py-16 md:py-24">
                <div className="container max-w-4xl px-4 md:px-6">
                    <div className="space-y-4 text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                            Terms of Service
                        </h1>
                        <p className="text-muted-foreground md:text-xl">
                            Effective Date: October 26, 2024
                        </p>
                    </div>

                    <div className="space-y-8">
                        <p className="text-muted-foreground">Welcome to **ShipCargo** ("Platform", "we", "our", "us"). These Terms of Service ("Terms") govern your access to and use of the ShipCargo website, applications, and services (collectively, the "Services"). By accessing or using ShipCargo, you agree to be bound by these Terms.</p>
                        <p className="font-semibold">If you do not agree, do not use the Services.</p>

                        <Section title="1. About ShipCargo">
                            <p>ShipCargo is a **digital freight and shipment bidding marketplace** that enables exporters, importers, freight forwarders, transporters, and logistics service providers (collectively, "Users") to post shipments and submit bids. **ShipCargo is a technology platform only** and does not provide transportation, freight forwarding, customs brokerage, or logistics services.</p>
                        </Section>

                        <Section title="2. Eligibility">
                             <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>Be at least 18 years old</li>
                                <li>Have authority to enter into a binding contract</li>
                                <li>Use the Platform for lawful commercial purposes only</li>
                            </ul>
                            <p>By registering, you represent that all information provided is accurate and complete.</p>
                        </Section>

                        <Section title="3. User Accounts">
                            <SubSection title="3.1 Registration">
                               <p>To access certain features, you must create an account. You are responsible for:</p>
                                <ul className="list-disc list-outside pl-5 space-y-2">
                                    <li>Maintaining confidentiality of login credentials</li>
                                    <li>All activity conducted under your account</li>
                                </ul>
                            </SubSection>
                             <SubSection title="3.2 Account Verification">
                                <p>ShipCargo may verify Users through documents, phone, email, or third‑party services. Verification does **not** guarantee the quality, legality, or reliability of any User or service provider.</p>
                             </SubSection>
                             <SubSection title="3.3 Account Suspension">
                                <p>We reserve the right to suspend or terminate accounts for:</p>
                                 <ul className="list-disc list-outside pl-5 space-y-2">
                                    <li>False or misleading information</li>
                                    <li>Fraudulent or abusive behavior</li>
                                    <li>Violation of these Terms</li>
                                </ul>
                            </SubSection>
                        </Section>

                        <Section title="4. Role of ShipCargo (Platform Disclaimer)">
                           <p>ShipCargo:</p>
                            <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>Does **not** act as a carrier, agent, broker, or insurer</li>
                                <li>Does **not** guarantee shipment execution, pricing, delivery time, or service quality</li>
                                <li>Is **not a party** to any agreement between Exporters and Carriers</li>
                            </ul>
                           <p>All contracts formed through bidding are **solely between Users**.</p>
                        </Section>
                        
                         <Section title="5. Shipment Listings">
                            <p>Users posting shipments agree that:</p>
                             <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>Shipment details are accurate and lawful</li>
                                <li>Goods comply with all applicable laws (customs, export controls, hazardous materials, etc.)</li>
                                <li>They have the right and authority to ship the listed goods</li>
                            </ul>
                            <p>ShipCargo may remove listings that violate laws or platform policies.</p>
                        </Section>

                         <Section title="6. Bidding Process">
                            <SubSection title="6.1 Bids">
                                 <ul className="list-disc list-outside pl-5 space-y-2">
                                    <li>Bids are binding offers unless stated otherwise</li>
                                    <li>Users are responsible for understanding shipment requirements before bidding</li>
                                </ul>
                            </SubSection>
                             <SubSection title="6.2 Anti‑Sniping / Soft Close">
                                <p>ShipCargo may extend bidding time to ensure fair competition. Such extensions are final and system‑controlled.</p>
                             </SubSection>
                            <SubSection title="6.3 Bid Acceptance">
                                <p>Acceptance of a bid creates a **direct contractual obligation** between the involved Users.</p>
                            </SubSection>
                        </Section>

                        <Section title="7. Payments & Fees">
                            <SubSection title="7.1 Platform Fees">
                                <p>ShipCargo may charge service fees, subscription fees, or transaction fees. Applicable fees will be disclosed prior to use.</p>
                            </SubSection>
                            <SubSection title="7.2 Third‑Party Payments">
                                <p>Payments may be processed via third‑party gateways. ShipCargo is not responsible for failures, delays, or disputes arising from such providers.</p>
                            </SubSection>
                            <SubSection title="7.3 Taxes">
                                <p>Users are solely responsible for any applicable taxes, duties, or levies.</p>
                            </SubSection>
                        </Section>

                        <Section title="8. Cancellations & Disputes">
                           <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>ShipCargo does not mediate commercial disputes by default</li>
                                <li>Users are encouraged to resolve disputes directly</li>
                                <li>ShipCargo may provide limited facilitation but bears no liability</li>
                            </ul>
                            <p>ShipCargo may suspend accounts involved in repeated disputes or misconduct.</p>
                        </Section>
                        
                        <Section title="9. Ratings & Reviews">
                            <p>Users may leave ratings and reviews. You agree that:</p>
                             <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>Feedback is honest and lawful</li>
                                <li>ShipCargo may remove content that is abusive, false, or misleading</li>
                            </ul>
                        </Section>

                        <Section title="10. Prohibited Activities">
                             <p>Users shall not:</p>
                            <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>Use the Platform for illegal shipments</li>
                                <li>Manipulate bids or pricing</li>
                                <li>Scrape, copy, or reverse engineer the Platform</li>
                                <li>Circumvent platform fees</li>
                                <li>Upload malware or malicious code</li>
                            </ul>
                            <p>Violation may result in immediate termination.</p>
                        </Section>
                        
                        <Section title="11. Intellectual Property">
                            <p>All Platform content, trademarks, logos, software, and design are owned by ShipCargo or its licensors. Users receive a limited, non‑exclusive, non‑transferable license to use the Services.</p>
                        </Section>

                        <Section title="12. Confidentiality">
                             <p>Users agree not to misuse confidential information obtained through the Platform, including pricing, shipment details, and business data.</p>
                        </Section>

                        <Section title="13. Data & Privacy">
                            <p>Use of the Platform is subject to our **Privacy Policy**. By using ShipCargo, you consent to data collection and processing as described therein.</p>
                        </Section>

                        <Section title="14. Limitation of Liability">
                             <p>To the maximum extent permitted by law, ShipCargo shall not be liable for:</p>
                            <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>Loss of goods</li>
                                <li>Delays or service failures</li>
                                <li>Indirect, incidental, or consequential damages</li>
                            </ul>
                            <p>Total liability, if any, shall not exceed fees paid to ShipCargo in the preceding 3 months.</p>
                        </Section>

                        <Section title="15. Indemnification">
                            <p>You agree to indemnify and hold harmless ShipCargo from claims, damages, losses, or expenses arising from:</p>
                            <ul className="list-disc list-outside pl-5 space-y-2">
                                <li>Your use of the Platform</li>
                                <li>Violation of laws or these Terms</li>
                                <li>Disputes with other Users</li>
                            </ul>
                        </Section>
                        
                        <Section title="16. Termination">
                            <p>ShipCargo may suspend or terminate access at any time without notice for violations or risk to the Platform.</p>
                        </Section>

                        <Section title="17. Governing Law & Jurisdiction">
                            <p>These Terms shall be governed by the laws of **India**. Courts located in **Mumbai, India** shall have exclusive jurisdiction.</p>
                        </Section>

                        <Section title="18. Modifications">
                            <p>ShipCargo may update these Terms at any time. Continued use after changes constitutes acceptance.</p>
                        </Section>

                        <Section title="19. Contact Information">
                            <p>For questions or legal notices:</p>
                            <p><strong>Email:</strong> <a href="mailto:support@shipcargo.in" className="text-primary hover:underline">support@shipcargo.in</a></p>
                            <p><strong>Website:</strong> <a href="http://www.shipcargo.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.shipcargo.in</a></p>
                        </Section>

                        <p className="font-bold text-lg text-center pt-8">By using ShipCargo, you acknowledge that you have read, understood, and agreed to these Terms of Service.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
