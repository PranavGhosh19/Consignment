
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, setDoc, collection, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

const FileInput = ({ id, onFileChange, disabled, file, currentFileUrl }: { id: string, onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void, disabled: boolean, file: File | null, currentFileUrl?: string }) => (
    <div className="grid gap-2">
        <Label htmlFor={id} className="sr-only">Upload file</Label>
        <Input 
            id={id} 
            type="file" 
            onChange={onFileChange} 
            disabled={disabled} 
            accept=".pdf,.jpg,.jpeg,.png"
            className="text-muted-foreground file:text-primary file:font-semibold"
        />
        {file ? (
            <p className="text-sm text-muted-foreground">New file: {file.name}</p>
        ) : currentFileUrl ? (
            <a href={currentFileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">View current document</a>
        ) : null}
    </div>
);


export function ExporterVerificationForm({ user, userType }: { user: User, userType: string | null }) {
    const router = useRouter();
    const { toast } = useToast();

    // Text input state
    const [companyName, setCompanyName] = useState("");
    const [gst, setGst] = useState("");
    const [pan, setPan] = useState("");
    const [tan, setTan] = useState("");
    const [iecCode, setIecCode] = useState("");
    const [adCode, setAdCode] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [companyType, setCompanyType] = useState("");
    
    // File input state
    const [gstFile, setGstFile] = useState<File | null>(null);
    const [panFile, setPanFile] = useState<File | null>(null);
    const [tanFile, setTanFile] = useState<File | null>(null);
    const [iecCodeFile, setIecCodeFile] = useState<File | null>(null);
    const [adCodeFile, setAdCodeFile] = useState<File | null>(null);
    const [licenseFile, setLicenseFile] = useState<File | null>(null);
    const [incorporationCertificate, setIncorporationCertificate] = useState<File | null>(null);
    
    // For pre-filling
    const [existingDetails, setExistingDetails] = useState<any>(null);


    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    // If user was rejected, fetch their previous details to pre-fill the form
                    if (userData.verificationStatus === 'rejected') {
                        const detailsRef = doc(db, 'users', user.uid, 'companyDetails', user.uid);
                        const detailsSnap = await getDoc(detailsRef);
                        if (detailsSnap.exists()) {
                            const details = detailsSnap.data();
                            setExistingDetails(details);
                            setCompanyName(details.legalName || "");
                            setGst(details.gstin || "");
                            setPan(details.pan || "");
                            setTan(details.tan || "");
                            setIecCode(details.iecCode || "");
                            setAdCode(details.adCode || "");
                            setLicenseNumber(details.licenseNumber || "");
                            setCompanyType(details.companyType || "");
                        }
                    }
                }
                 setLoading(false);
            }
        };
        fetchUserData();
    }, [user]);

    const isExporter = userType === 'exporter';
    const isCarrier = userType === 'carrier';

    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setter(e.target.files[0]);
        }
    };

    const uploadFile = async (file: File, docType: string): Promise<{ url: string, path: string }> => {
        const filePath = `verification-documents/${userType}/${user.uid}/${docType}-${file.name}-${Date.now()}`;
        const fileRef = ref(storage, filePath);
        const uploadResult = await uploadBytes(fileRef, file);
        const downloadUrl = await getDownloadURL(uploadResult.ref);
        return { url: downloadUrl, path: filePath };
    };

    const handleSubmit = async () => {
        setIsConfirmOpen(false);
        if (isExporter && (!companyName || !gst || !pan || !iecCode || !adCode)) {
             toast({ title: "Missing Fields", description: "Please fill out all required text fields.", variant: "destructive" });
             return;
        }
        if (isCarrier && (!companyName || !gst || !pan || !licenseNumber || !companyType)) {
             toast({ title: "Missing Fields", description: "Please fill out all required fields for carriers.", variant: "destructive" });
             return;
        }
        if (!incorporationCertificate && !existingDetails?.incorporationCertificateUrl) {
            toast({ title: "Missing Document", description: "Please upload the incorporation certificate.", variant: "destructive" });
            return;
        }


        setIsSubmitting(true);

        try {
            const companyDetailsPayload: any = {
                legalName: companyName,
                gstin: gst,
                pan,
            };

            // Only update file URL if a new file is provided
            if (gstFile) {
              const gstUpload = await uploadFile(gstFile, 'gst');
              companyDetailsPayload.gstFileUrl = gstUpload.url;
              companyDetailsPayload.gstFilePath = gstUpload.path;
            }
            if (panFile) {
              const panUpload = await uploadFile(panFile, 'pan');
              companyDetailsPayload.panFileUrl = panUpload.url;
              companyDetailsPayload.panFilePath = panUpload.path;
            }
            if (incorporationCertificate) {
              const incUpload = await uploadFile(incorporationCertificate, 'incorporation-certificate');
              companyDetailsPayload.incorporationCertificateUrl = incUpload.url;
              companyDetailsPayload.incorporationCertificatePath = incUpload.path;
            }

            // Exporter specific fields and uploads
            if (isExporter) {
                companyDetailsPayload.tan = tan;
                companyDetailsPayload.iecCode = iecCode;
                companyDetailsPayload.adCode = adCode;

                if (tanFile) {
                    const tanUpload = await uploadFile(tanFile, 'tan');
                    companyDetailsPayload.tanFileUrl = tanUpload.url;
                    companyDetailsPayload.tanFilePath = tanUpload.path;
                }
                if (iecCodeFile) {
                    const iecUpload = await uploadFile(iecCodeFile, 'iec');
                    companyDetailsPayload.iecCodeFileUrl = iecUpload.url;
                    companyDetailsPayload.iecCodeFilePath = iecUpload.path;
                }
                if (adCodeFile) {
                    const adUpload = await uploadFile(adCodeFile, 'ad');
                    companyDetailsPayload.adCodeFileUrl = adUpload.url;
                    companyDetailsPayload.adCodeFilePath = adUpload.path;
                }
            }

            // Carrier specific fields
            if (isCarrier) {
                companyDetailsPayload.licenseNumber = licenseNumber;
                companyDetailsPayload.companyType = companyType;
                if (licenseFile) {
                  const licenseUpload = await uploadFile(licenseFile, 'license');
                  companyDetailsPayload.licenseFileUrl = licenseUpload.url;
                  companyDetailsPayload.licenseFilePath = licenseUpload.path;
                }
            }
            
            // Save the details to the subcollection
            const companyDetailsDocRef = doc(db, "users", user.uid, "companyDetails", user.uid);
            await setDoc(companyDetailsDocRef, companyDetailsPayload, { merge: true });

            // **CRITICAL STEP:** Update the main user document status back to 'pending'
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { verificationStatus: 'pending' });

            toast({ title: "Verification Submitted", description: "Your business details have been submitted for review." });
            router.push("/dashboard");

        } catch (error) {
            console.error("Error submitting verification: ", error);
            toast({ title: "Submission Failed", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
                 <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        )
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
                <Card className="mx-auto w-full max-w-2xl shadow-xl">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold font-headline capitalize">
                            {userType} Business Verification
                        </CardTitle>
                        <CardDescription className="text-base">
                            Please provide your company's details for verification.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Company Details</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="company-name">Name of the Company</Label>
                                <Input id="company-name" value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={isSubmitting} />
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Tax Information</h3>
                            <div className="grid sm:grid-cols-2 gap-4 items-end">
                                 <div className="grid gap-2">
                                    <Label htmlFor="gst">GST Number</Label>
                                    <Input id="gst" value={gst} onChange={e => setGst(e.target.value)} disabled={isSubmitting} />
                                </div>
                                 <FileInput id="gst-file" onFileChange={handleFileChange(setGstFile)} disabled={isSubmitting} file={gstFile} currentFileUrl={existingDetails?.gstFileUrl} />
                            </div>

                             <div className="grid sm:grid-cols-2 gap-4 items-end">
                                <div className="grid gap-2">
                                    <Label htmlFor="pan">PAN</Label>
                                    <Input id="pan" value={pan} onChange={e => setPan(e.target.value)} disabled={isSubmitting} />
                                </div>
                                <FileInput id="pan-file" onFileChange={handleFileChange(setPanFile)} disabled={isSubmitting} file={panFile} currentFileUrl={existingDetails?.panFileUrl}/>
                            </div>
                            
                            {isExporter && (
                                <div className="grid sm:grid-cols-2 gap-4 items-end">
                                    <div className="grid gap-2">
                                        <Label htmlFor="tan">TAN (If registered)</Label>
                                        <Input id="tan" value={tan} onChange={e => setTan(e.target.value)} disabled={isSubmitting} />
                                    </div>
                                    <FileInput id="tan-file" onFileChange={handleFileChange(setTanFile)} disabled={isSubmitting} file={tanFile} currentFileUrl={existingDetails?.tanFileUrl} />
                                </div>
                            )}
                        </div>

                        {isExporter && (
                            <>
                                <Separator />
                                <div className="space-y-4">
                                     <h3 className="text-lg font-medium">Import/Export Codes</h3>
                                     <div className="grid sm:grid-cols-2 gap-4 items-end">
                                        <div className="grid gap-2">
                                            <Label htmlFor="iec">IEC Code</Label>
                                            <Input id="iec" value={iecCode} onChange={e => setIecCode(e.target.value)} disabled={isSubmitting} />
                                        </div>
                                         <FileInput id="iec-file" onFileChange={handleFileChange(setIecCodeFile)} disabled={isSubmitting} file={iecCodeFile} currentFileUrl={existingDetails?.iecCodeFileUrl} />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4 items-end">
                                        <div className="grid gap-2">
                                            <Label htmlFor="ad">AD Code</Label>
                                            <Input id="ad" value={adCode} onChange={e => setAdCode(e.target.value)} disabled={isSubmitting} />
                                        </div>
                                        <FileInput id="ad-file" onFileChange={handleFileChange(setAdCodeFile)} disabled={isSubmitting} file={adCodeFile} currentFileUrl={existingDetails?.adCodeFileUrl} />
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {isCarrier && (
                            <>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Carrier Details</h3>
                                    <div className="grid sm:grid-cols-2 gap-4 items-end">
                                        <div className="grid gap-2">
                                            <Label htmlFor="license-number">License Number</Label>
                                            <Input id="license-number" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} disabled={isSubmitting} />
                                        </div>
                                        <FileInput id="license-file" onFileChange={handleFileChange(setLicenseFile)} disabled={isSubmitting} file={licenseFile} currentFileUrl={existingDetails?.licenseFileUrl} />
                                    </div>
                                     <div className="grid sm:grid-cols-2 gap-4">
                                         <div className="grid gap-2">
                                            <Label htmlFor="company-type">Company Type</Label>
                                            <Select value={companyType} onValueChange={setCompanyType} disabled={isSubmitting}>
                                                <SelectTrigger id="company-type">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                                                    <SelectItem value="Partnership">Partnership</SelectItem>
                                                    <SelectItem value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</SelectItem>
                                                    <SelectItem value="Private Limited Company">Private Limited Company</SelectItem>
                                                    <SelectItem value="Public Limited Company">Public Limited Company</SelectItem>
                                                    <SelectItem value="Foreign Company">Foreign Company</SelectItem>
                                                    <SelectItem value="Multinational Company (MNC)">Multinational Company (MNC)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <Separator />
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Incorporation Certificate</h3>
                            <FileInput id="incorporation-cert" onFileChange={handleFileChange(setIncorporationCertificate)} disabled={isSubmitting} file={incorporationCertificate} currentFileUrl={existingDetails?.incorporationCertificateUrl} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => setIsConfirmOpen(true)} disabled={isSubmitting} className="w-full h-12 text-lg">
                            {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : 'Submit for Verification'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to submit these details for verification? You will not be able to edit them after submission until the review is complete.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Confirm & Submit"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
