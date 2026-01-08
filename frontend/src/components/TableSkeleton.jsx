import { Skeleton } from "./ui/skeleton"
import { TableCell, TableRow, TableHeader, TableHead } from "./ui/table"

const TableSkeleton = ({ columns = [], rows = 5, showHeader = true, showPagination = true }) => {
  return (
    <>
      {showHeader && (
        <TableHeader>
          <TableRow>
            {columns.map((_, idx) => (
              <TableHead key={idx}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}

      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </div>

      {showPagination && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>

          <div className="ml-6">
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
        </div>
      )}
    </>
  )
}

export default TableSkeleton
