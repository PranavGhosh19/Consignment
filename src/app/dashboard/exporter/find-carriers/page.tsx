
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs, DocumentData, orderBy } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Building, Truck, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

type Carrier = DocumentData & {
    id: string;
    deliveredCount: number;
    rating: number;
};

const PageSkeleton = () => (
    <div className="container py-6 md:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-96 w-full" />
    </div>
);

export default function FindCarriersPage() {
    const [user, setUser] = useState<User | null>(null);
    const [carriers, setCarriers] = useState<Carrier[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("deliveredCount_desc");
    
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const fetchCarriersAndStats = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Fetch all approved carriers
            const carriersQuery = query(collection(db, "users"), where("userType", "==", "carrier"), where("verificationStatus", "==", "approved"));
            const carriersSnapshot = await getDocs(carriersQuery);
            const carriersList = carriersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Fetch all delivered shipments to count
            const shipmentsQuery = query(collection(db, "shipments"), where("status", "==", "delivered"));
            const shipmentsSnapshot = await getDocs(shipmentsQuery);
            
            const deliveredCounts: Record<string, number> = {};
            shipmentsSnapshot.forEach(doc => {
                const carrierId = doc.data().winningCarrierId;
                if (carrierId) {
                    deliveredCounts[carrierId] = (deliveredCounts[carrierId] || 0) + 1;
                }
            });
            
            // TODO: Add feedback/rating fetching logic here if available

            const carriersWithStats = carriersList.map(c => ({
                ...c,
                deliveredCount: deliveredCounts[c.id] || 0,
                rating: 0, // Placeholder
            })) as Carrier[];

            setCarriers(carriersWithStats);

        } catch (error) {
            console.error("Error fetching carriers:", error);
            toast({ title: "Error", description: "Could not fetch carrier data.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }, [user, toast]);

    useEffect(() => {
        fetchCarriersAndStats();
    }, [fetchCarriersAndStats]);

    const filteredAndSortedCarriers = useMemo(() => {
        let filtered = carriers.filter(carrier => 
            (carrier.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (carrier.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );

        const [field, direction] = sortOption.split('_');

        filtered.sort((a, b) => {
            const valA = (a as any)[field] || 0;
            const valB = (b as any)[field] || 0;

            if (direction === 'asc') {
                return valA - valB;
            } else {
                return valB - valA;
            }
        });

        return filtered;
    }, [carriers, searchTerm, sortOption]);

    if (loading) {
        return <PageSkeleton />;
    }

    return (
        <div className="container py-6 md:py-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">Find Carriers</h1>
                <p className="text-muted-foreground hidden md:block">
                    Browse and vet our network of approved carriers.
                </p>
            </div>
            
            <Card className="mb-8">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by carrier name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="w-full sm:w-auto sm:min-w-[200px]">
                        <Select value={sortOption} onValueChange={setSortOption}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="deliveredCount_desc">Shipments Delivered (High to Low)</SelectItem>
                                <SelectItem value="deliveredCount_asc">Shipments Delivered (Low to High)</SelectItem>
                                <SelectItem value="rating_desc">Rating (High to Low)</SelectItem>
                                <SelectItem value="rating_asc">Rating (Low to High)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>


            {filteredAndSortedCarriers.length > 0 ? (
                <div className="border rounded-lg overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Carrier</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">Shipments Delivered</TableHead>
                                <TableHead className="text-center">Rating</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSortedCarriers.map((carrier) => (
                                <TableRow key={carrier.id}>
                                    <TableCell className="font-medium">{carrier.name || 'N/A'}</TableCell>
                                    <TableCell>{carrier.email || 'N/A'}</TableCell>
                                    <TableCell className="text-center font-semibold">
                                        <div className="flex items-center justify-center gap-2">
                                            <Truck className="h-4 w-4 text-primary" />
                                            {carrier.deliveredCount}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className="flex items-center justify-center gap-1 w-20 mx-auto">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="font-bold">{carrier.rating.toFixed(1)}</span>
                                        </Badge>
                                    </TableCell>
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
                    <h2 className="text-xl font-semibold mb-2">No Carriers Found</h2>
                    <p className="text-muted-foreground">There are currently no carriers matching your search criteria.</p>
                </div>
            )}
        </div>
    );
}
