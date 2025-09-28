
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import type { User } from "firebase/auth";
import { db, storage } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { Progress } from "./ui/progress";

interface ExporterVerificationFormProps {
    user: User;
}

export function ExporterVerificationForm({ user }: ExporterVerificationFormProps) {
    const router = useRouter();
    const { toast } = useToast();

    // Form state
    const [companyName, setCompanyName] = useState("");
    const [gst, setGst] = useState("");
    const [pan, setPan] = useState("");
    const [tan, setTan] = useState("");
    const [iecCode, setIecCode] = useState("");
    const [adCode, setAdCode] = useState("");
    const [incorpCert, setIncorpCert] = useState<File | null>(null);
    
    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast({ title: "File Too Large", description: "Please select a file smaller than 5MB.", variant: "destructive" });
                return;
            }
            setIncorpCert(file);
        }
    };

    const handleSubmit = async () => {
        if (!companyName || !gst || !pan || !iecCode || !adCode || !incorpCert) {
            toast({ title: "Missing Fields", description: "Please fill out all required fields and upload the certificate.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);

        try {
            // 1. Upload certificate to Firebase Storage
            const filePath = `verification-documents/${user.uid}/${incorpCert.name}`;
            const storageRef = ref(storage, filePath);
            const uploadTask = uploadBytesResumable(storageRef, incorpCert);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("File upload error: ", error);
                    toast({ title: "Upload Failed", description: "Could not upload your certificate. Please try again.", variant: "destructive"});
                    setIsSubmitting(false);
                },
                async () => {
                    // 2. Get download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // 3. Save all data to Firestore
                    const userDocRef = doc(db, "users", user.uid);
                    await updateDoc(userDocRef, {
                        companyDetails: {
                            legalName: companyName,
                            gstin: gst,
                            pan,
                            tan,
                            iecCode,
                            adCode,
                            incorporationCertificateUrl: downloadURL,
                        },
                        gstin: gst, // Keep gstin at top level for compatibility
                        isGstVerified: true, // Mark as verified
                    });

                    toast({ title: "Verification Submitted", description: "Your business details have been saved." });
                    router.push("/dashboard");
                }
            );

        } catch (error) {
            console.error("Error submitting verification: ", error);
            toast({ title: "Submission Failed", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <Card className="mx-auto w-full max-w-2xl shadow-xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold font-headline">
                        Exporter Business Verification
                    </CardTitle>
                    <CardDescription className="text-base">
                        Please provide your company's details for verification.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="company-name">Name of the Company</Label>
                            <Input id="company-name" value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gst">GST</Label>
                            <Input id="gst" value={gst} onChange={e => setGst(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pan">PAN</Label>
                            <Input id="pan" value={pan} onChange={e => setPan(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="tan">TAN (If registered)</Label>
                            <Input id="tan" value={tan} onChange={e => setTan(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="iec">IEC Code</Label>
                            <Input id="iec" value={iecCode} onChange={e => setIecCode(e.target.value)} disabled={isSubmitting} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="ad">AD Code</Label>
                            <Input id="ad" value={adCode} onChange={e => setAdCode(e.target.value)} disabled={isSubmitting} />
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="incorp-cert">Incorporation Certificate</Label>
                        <div className="flex items-center gap-4">
                            <Input id="incorp-cert" type="file" onChange={handleFileChange} disabled={isSubmitting} accept=".pdf,.jpg,.jpeg,.png" className="flex-1" />
                            {incorpCert && <span className="text-sm text-muted-foreground truncate max-w-xs">{incorpCert.name}</span>}
                        </div>
                        <p className="text-xs text-muted-foreground">Max file size: 5MB. Accepted formats: PDF, JPG, PNG.</p>
                     </div>
                     {isSubmitting && (
                        <div className="space-y-2">
                            <Label>Uploading...</Label>
                            <Progress value={uploadProgress} />
                            <p className="text-sm text-muted-foreground text-center">{Math.round(uploadProgress)}%</p>
                        </div>
                     )}
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full h-12 text-lg">
                        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : 'Submit for Verification'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
