
"use client";

import { MoreHorizontal, FileDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsers, type User } from "@/lib/users";
import { useEffect, useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";

export default function UsersPage() {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        const fetchedUsers = await getUsers();
        setAllUsers(fetchedUsers);
        setLoading(false);
      }
      fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
      if (!debouncedSearchTerm) return allUsers;
      const lowercasedTerm = debouncedSearchTerm.toLowerCase();
      return allUsers.filter(user => 
        user.name.toLowerCase().includes(lowercasedTerm) ||
        user.email.toLowerCase().includes(lowercasedTerm)
      );
    }, [allUsers, debouncedSearchTerm]);

    const handleExport = () => {
      const headers = ["ID", "Name", "Email", "Orders", "Total Spent"];
      const rows = filteredUsers.map(u => [u.id, `"${u.name}"`, u.email, u.orders, `"${u.totalSpent}"`].join(','));
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "customers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            View and manage your customer base.
          </CardDescription>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <div className="relative flex-1 md:flex-initial">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
                type="search"
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <Button size="sm" variant="outline" className="h-9 gap-1" onClick={handleExport}>
                <FileDown className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
        ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
               <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.id}.png`} alt="Avatar" />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{user.name}</div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell className="text-right">{user.totalSpent}</TableCell>
                 <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/account?userId=${user.id}`}>View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/orders?userId=${user.id}`}>View Orders</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
             {filteredUsers.length === 0 && !loading && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No results found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-{filteredUsers.length}</strong> of <strong>{allUsers.length}</strong> customers
        </div>
      </CardFooter>
    </Card>
  );
}
