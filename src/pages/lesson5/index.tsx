import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User, useUserStore } from "./store/userStore";
import { v4 } from "uuid";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface RandomUserResponse {
    username: string;
    sex: string;
    address: string;
    name: string;
    email: string;
    birthday: string;
}

export default function UserTable() {
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { users, addUser, deleteUser, updateUserAddress } = useUserStore();

    function handleAddUser() {
        setIsLoading(true);

        fetch("https://api.api-ninjas.com/v1/randomuser", {
            headers: {
                "X-Api-Key": "CMUao/z4vbMVY5iiNr9iZw==DHJtHDp6MW6Wehmg",
            },
        })
            .then((res) => res.json())
            .then((data: RandomUserResponse) => {
                const user: User = {
                    id: v4(),
                    username: data.username,
                    sex: data.sex,
                    address: data.address,
                    name: data.name,
                    email: data.email,
                    birthday: data.birthday,
                };
                addUser(user);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-4">
            <Button
                onClick={handleAddUser}
                disabled={isLoading}
                className="w-50"
            >
                {isLoading ? "Loading..." : "Add Random User"}
            </Button>
            <Table className="border border-border rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <TableCell className="cursor-pointer">
                                        {user.username}
                                    </TableCell>
                                </DialogTrigger>
                                <DialogContent>
                                    <p>
                                        <strong>Name:</strong> {user.name}
                                    </p>
                                    <p>
                                        <strong>Sex:</strong> {user.sex}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p>
                                        <strong>Birthday:</strong>{" "}
                                        {user.birthday}
                                    </p>
                                    <Input
                                        defaultValue={user.address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button
                                                onClick={() =>
                                                    updateUserAddress(
                                                        user.id,
                                                        address
                                                    )
                                                }
                                            >
                                                Save
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button
                                    variant="destructive"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isLoading && (
                        <TableRow>
                            <TableCell>
                                <Skeleton className="h-5 w-[120px] rounded-sm" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-[200px] rounded-sm" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-[180px] rounded-sm" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-[80px] rounded-sm" />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
