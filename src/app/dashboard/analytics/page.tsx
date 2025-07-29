
"use client";

import { useState, useEffect, useMemo, useRef, DragEvent } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Ship, Anchor, Building, FileDown, Eye, GripVertical } from "lucide-react";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import * as XLSX from 'xlsx';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AnalyticsView = "exporters" | "carriers" | "shipments";

const initialColumns = [
    { id: 'legalName', label: 'Legal Name', visible: true },
    { id: 'tradeName', label: 'Trade Name', visible: true },
    { id: 'address', label: 'Address', visible: true },
    { id: 'gstin', label: 'GSTIN', visible: true },
    { id: 'email', label: 'Email', visible: true },
];

const SidebarNav = ({ activeView, setView }: { activeView: AnalyticsView, setView: (view: AnalyticsView) => void }) => {
    const navItems = [
        { id: "shipments", label: "Shipments", icon: Ship },
        { id: "exporters", label: "Exporters", icon: Anchor },
        { id: "carriers", label: "Carriers", icon: Users },
    ] as const;

    return (
        <nav className="flex flex-col gap-2">
            {navItems.map(item => (
                <Button
                    key={item.id}
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => setView(item.id)}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </Button>
            ))}
        </nav>
    );
}

const AnalyticsContent = ({ view }: { view: AnalyticsView }) => {
    const [exporters, setExporters] = useState<DocumentData[]>([]);
    const [carriers, setCarriers] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(false);
    const [columns, setColumns] = useState(initialColumns);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let q;
                if (view === 'exporters') {
                    q = query(collection(db, "users"), where("userType", "==", "exporter"));
                } else if (view === 'carriers') {
                    q = query(collection(db, "users"), where("userType", "==", "carrier"));
                } else {
                    setLoading(false);
                    return; 
                }

                const querySnapshot = await getDocs(q);
                const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                if (view === 'exporters') {
                    setExporters(list);
                } else if (view === 'carriers') {
                    setCarriers(list);
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: `Could not fetch ${view} data.`,
                    variant: "destructive"
                });
                console.error(`Error fetching ${view}: `, error);
            } finally {
                setLoading(false);
            }
        };

        if (view === 'exporters' || view === 'carriers') {
            fetchData();
        }
    }, [view, toast]);
    
    const visibleColumns = useMemo(() => columns.filter(c => c.visible), [columns]);

    const handleDownload = () => {
        const data = view === 'exporters' ? exporters : carriers;
        if (data.length === 0) {
            toast({ title: "No Data", description: "There is no data to download." });
            return;
        }

        const formattedData = data.map(user => {
            const row: { [key: string]: any } = {};
            visibleColumns.forEach(col => {
                switch(col.id) {
                    case 'legalName': row[col.label] = user.companyDetails?.legalName || 'N/A'; break;
                    case 'tradeName': row[col.label] = user.companyDetails?.tradeName || 'N/A'; break;
                    case 'address': row[col.label] = user.companyDetails?.address || 'N/A'; break;
                    case 'gstin': row[col.label] = user.gstin || 'N/A'; break;
                    case 'email': row[col.label] = user.email || 'N/A'; break;
                }
            });
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, view.charAt(0).toUpperCase() + view.slice(1));
        
        // Set column widths based on visible columns
        worksheet['!cols'] = visibleColumns.map(col => {
            switch(col.id) {
                case 'legalName': return { wch: 30 };
                case 'tradeName': return { wch: 25 };
                case 'address': return { wch: 50 };
                case 'gstin': return { wch: 20 };
                case 'email': return { wch: 30 };
                default: return { wch: 20 };
            }
        });

        XLSX.writeFile(workbook, `${view}_data.xlsx`);
        toast({ title: "Success", description: `${view} data has been downloaded.` });
    };
    
    const handleColumnVisibilityChange = (columnId: string, checked: boolean) => {
        setColumns(prev => prev.map(col => col.id === columnId ? { ...col, visible: checked } : col));
    };

    const handleDragEnd = () => {
        if (dragItem.current !== null && dragOverItem.current !== null) {
            const newColumns = [...columns];
            const draggedItemContent = newColumns.splice(dragItem.current, 1)[0];
            newColumns.splice(dragOverItem.current, 0, draggedItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setColumns(newColumns);
        }
    };
    
    const handleDragStart = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;
        const newColumns = [...columns];
        const draggedItemContent = newColumns.splice(dragItem.current!, 1)[0];
        newColumns.splice(dragOverItem.current, 0, draggedItemContent);
        dragItem.current = dragOverItem.current;
        dragOverItem.current = null;
        setColumns(newColumns);
    };

    const renderUserTable = (users: DocumentData[], type: 'exporter' | 'carrier') => (
        <>
            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            ) : users.length > 0 ? (
                <div className="border rounded-lg overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {visibleColumns.map(col => (
                                    <TableHead key={col.id}>{col.label}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    {visibleColumns.map(col => (
                                        <TableCell key={col.id} className="font-medium">
                                            {
                                                col.id === 'legalName' ? user.companyDetails?.legalName || 'N/A' :
                                                col.id === 'tradeName' ? user.companyDetails?.tradeName || 'N/A' :
                                                col.id === 'address' ? user.companyDetails?.address || 'N/A' :
                                                col.id === 'gstin' ? user.gstin || 'N/A' :
                                                col.id === 'email' ? user.email || 'N/A' :
                                                'N/A'
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
                    <div className="flex justify-center mb-4">
                        <Building className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No {type}s Found</h2>
                    <p className="text-muted-foreground">There are currently no {type}s registered on the platform.</p>
                </div>
            )}
        </>
    );

    const contentMap = {
        shipments: {
            title: "Shipment Analytics",
            description: "Insights into shipment volumes, statuses, and routes.",
            content: (
                <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
                    <div className="flex justify-center mb-4">
                        <BarChart className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Detailed Analytics Coming Soon</h2>
                    <p className="text-muted-foreground">We're working on bringing you powerful insights. Stay tuned!</p>
                </div>
            )
        },
        exporters: {
            title: "Exporter Directory",
            description: "A list of all registered exporters on the platform.",
            content: renderUserTable(exporters, 'exporter')
        },
        carriers: {
            title: "Carrier Directory",
            description: "A list of all registered carriers on the platform.",
            content: renderUserTable(carriers, 'carrier')
        }
    };

    const currentContent = contentMap[view];
    const canDownload = (view === 'exporters' && exporters.length > 0) || (view === 'carriers' && carriers.length > 0);


    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>{currentContent.title}</CardTitle>
                    <CardDescription>{currentContent.description}</CardDescription>
                </div>
                {(view === 'exporters' || view === 'carriers') && (
                    <div className="flex items-center gap-2">
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Customize Columns</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Select columns to display and drag to reorder.
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        {columns.map((col, index) => (
                                            <div
                                                key={col.id}
                                                className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary cursor-grab"
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, index)}
                                                onDragEnter={(e) => handleDragEnter(e, index)}
                                                onDragEnd={handleDragEnd}
                                                onDragOver={(e) => e.preventDefault()}
                                            >
                                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                                <Checkbox
                                                    id={col.id}
                                                    checked={col.visible}
                                                    onCheckedChange={(checked) => handleColumnVisibilityChange(col.id, !!checked)}
                                                />
                                                <Label htmlFor={col.id} className="flex-1 font-normal cursor-pointer">{col.label}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button variant="outline" size="sm" onClick={handleDownload} disabled={!canDownload || loading}>
                            <FileDown className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                 {currentContent.content}
            </CardContent>
        </Card>
    );
};


export default function AnalyticsPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState<AnalyticsView>("exporters");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists() && userDoc.data()?.userType === 'employee') {
                    setUser(currentUser);
                    setLoading(false);
                } else {
                    router.push('/dashboard');
                }
            } else {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="container py-6 md:py-10">
                <Skeleton className="h-8 w-48 mb-8" />
                <div className="grid md:grid-cols-4 gap-8 items-start">
                    <div className="md:col-span-1">
                        <Skeleton className="h-32 w-full" />
                    </div>
                    <div className="md:col-span-3">
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container py-6 md:py-10">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">Platform Analytics</h1>
                <p className="text-muted-foreground">An overview of platform activity and key metrics.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 items-start">
                <div className="md:col-span-1">
                    <SidebarNav activeView={activeView} setView={setActiveView} />
                </div>
                <div className="md:col-span-3">
                    <AnalyticsContent view={activeView} />
                </div>
            </div>
        </div>
    );
}

