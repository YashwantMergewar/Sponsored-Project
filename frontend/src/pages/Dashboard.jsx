import {
  deleteVoterDetails,
  getAllVoterDetails,
} from "@/api/voter/registerVoterApi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import TableSkeleton from "@/components/TableSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const columnHelper = createColumnHelper();
// Columns are defined inside the Dashboard component so action handlers can access component state (setVoters) and helpers.

const Dashboard = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedVoterId, setSelectedVoterId] = useState(null);
  const [sort, setSort] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const formatDOB = (dob) => {
    if (!dob) return "";
    const d = new Date(dob);
    if (isNaN(d)) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDeleteVoter = async (voterId) => {
    try {
      setDeleting(voterId);
      await deleteVoterDetails(voterId);
      setVoters((prev) => {
        const newArr = prev.filter((v) => v.voter_id !== voterId);

        // adjust pagination if the current page became empty
        setPagination((p) => {
          const totalItems = newArr.length;
          const maxPageIndex = Math.max(
            0,
            Math.ceil(totalItems / p.pageSize) - 1
          );
          return { ...p, pageIndex: maxPageIndex };
          // if (p.pageIndex > maxPageIndex) {
          // }
          // return p;
        });

        return newArr;
      });
      toast.success("Voter deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete voter");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        setLoading(true);
        const voterData = await getAllVoterDetails();
        const formattedVoters = Array.isArray(voterData.voters)
          ? voterData.voters.map((v) => ({ ...v, dob: formatDOB(v.dob) }))  
          : voterData.voters;
        setVoters(formattedVoters);
      } catch (error) {
        console.error("Error fetching voters:", error);
        toast.error(error.message || "Failed to fetch voters");
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    fetchVoters();
  }, []);

  const columns = [
    columnHelper.accessor("fullname", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Name</span>,
    }),
    columnHelper.accessor("email", {
      cell: (info) => info.getValue(),
      header: () => (
        <span className="flex items-center justify-center">Email</span>
      ),
    }),
    columnHelper.accessor("head_of_family", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Head of Family</span>,
    }),
    columnHelper.accessor("mobile_no", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Mobile No</span>,
    }),
    columnHelper.accessor("aadhar_no", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Aadhar No</span>,
    }),
    columnHelper.accessor("dob", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Date of Birth</span>,
    }),
    columnHelper.accessor("age", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Age</span>,
    }),
    columnHelper.accessor("religion", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Religion</span>,
    }),
    columnHelper.accessor("caste", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Caste</span>,
    }),
    columnHelper.accessor("category", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Category</span>,
    }),
    columnHelper.accessor("prabhag_no", {
      cell: (info) => info.getValue(),
      header: () => <span className="flex items-center">Prabhag No</span>,
    }),
    columnHelper.accessor("actions", {
      enableHiding: false,
      cell: (info) => {
        const voter = info.row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer rounded-md px-3 py-2 text-sm
                   data-highlighted:bg-violet-800 data-highlighted:text-white focus:bg-violet-800 focus:text-white outline-none"
                onClick={() => navigate(`/voter/profile/${voter.voter_id}`)}
              >
                View Voter Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer rounded-md px-3 py-2 text-sm
                   data-highlighted:bg-red-800 data-highlighted:text-white focus:bg-red-800 focus:text-white outline-none"
                onClick={() => {
                  setSelectedVoterId(voter.voter_id);
                  setOpenDeleteDialog(true);
                }}
              >
                Delete Voter Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: voters,
    columns,
    state: {
      sorting: sort,
      globalFilter: globalFilter,
      pagination: pagination,
    },

    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSort,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageCount = table.getPageCount();
  const currentPage = pagination.pageIndex + 1;

  const visiblePages = 3;

  const startPage = Math.min(
    Math.max(currentPage - 1, 1),
    Math.max(pageCount - visiblePages + 1, 1)
  );

  const endPage = Math.min(startPage + visiblePages - 1, pageCount);

  return (
    <>
      {isAuthenticated ? (
        <div className="pt-4 pl-8 pr-8">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          <div className="mb-4 relative w-94">
            <Input
              placeholder="Search Voters..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="rounded-lg border border-gray-200 shadow-md overflow-x-auto">
            {loading ? (
              <TableSkeleton
                columns={columns}
                rows={pagination.pageSize || 10}
              />
            ) : (
              <Table>
                <TableHeader className="bg-gray-700">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead className="text-gray-200" key={header.id}>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer text-left select-none hover:underline flex items-center gap-2"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <ArrowUpDown size={12} />
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody className="text-left">
                  {loading ? (
                    <TableSkeleton
                      columns={columns}
                      rows={table.getState().pagination.pageSize}
                    />
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                        
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center"
                      >
                        No voters found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="mt-4 flex items-center justify-center gap-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={` hover:bg-violet-600 hover:text-white ${
                        !table.getCanPreviousPage()
                          ? "opacity-50 pointer-events-none"
                          : "cursor-pointer"
                      }`}
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => table.setPageIndex(page - 1)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {endPage < pageCount && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      className={` hover:bg-violet-600 hover:text-white ${
                        !table.getCanNextPage()
                          ? "opacity-50 pointer-events-none"
                          : "cursor-pointer"
                      }`}
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          <AlertDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
          >
            <AlertDialogTrigger asChild></AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deleting Voter Details</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-900">
                  Are you sure you want to delete voter details? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer hover:bg-gray-400">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await handleDeleteVoter(selectedVoterId);
                    setOpenDeleteDialog(false);
                  }}
                  className="bg-red-600 cursor-pointer"
                  disabled={deleting === selectedVoterId}
                >
                  {deleting === selectedVoterId ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Please log in to access the dashboard.</p>
          <p>Redirecting to Login Page </p>
          {setTimeout(() => {
            navigate("/auth");
            toast.warning(
              <b>Your session has expired!!</b> +
                "Please login to access dashboard"
            );
          }, 2000)}
        </div>
      )}
    </>
  );
};

export default Dashboard;
