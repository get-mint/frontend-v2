import { Tables } from "@/types/supabase";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type User = Tables<"users"> & {
  is_admin: boolean;
  email: string;
  last_active_at?: string;
};

interface UsersTableProps {
  users: User[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleAdmin: (userId: string, currentStatus: boolean) => void;
}

export function UsersTable({
  users,
  searchQuery,
  onSearchChange,
  onToggleAdmin,
}: UsersTableProps) {
  const filteredUsers = users.filter((user) =>
    user.tracking_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search users by tracking ID..."
          value={searchQuery}
          onChange={onSearchChange}
          className="max-w-md"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[150px]">Tracking ID</TableHead>
              <TableHead className="w-[150px]">Created At</TableHead>
              <TableHead className="w-[150px]">Last Active</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell className="w-[100px]">{user.user_id}</TableCell>
                <TableCell className="w-[200px]">{user.email}</TableCell>
                <TableCell className="w-[150px]">{user.tracking_id}</TableCell>
                <TableCell className="w-[150px]">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="w-[150px]">
                  {user.last_active_at && 
                    new Date(user.last_active_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="w-[100px]">
                  {user.is_admin ? "Administrator" : "User"}
                </TableCell>
                <TableCell className="w-[150px]">
                  <Button
                    variant={user.is_admin ? "destructive" : "default"}
                    onClick={() => user.user_id && onToggleAdmin(user.user_id, user.is_admin)}
                  >
                    {user.is_admin ? "Remove Admin" : "Make Admin"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
