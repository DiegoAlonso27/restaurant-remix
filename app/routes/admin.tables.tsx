import { Icon } from "@iconify/react/dist/iconify.js";
import { LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Table as TableType } from "types";
import Table from "~/sections/table/Table";
import { getTables } from "~/services/TableService";

export const loader: LoaderFunction = async ({ request }) => {
  const tables = await getTables(request);
  return Response.json(tables);
};

export default function AdminTables() {
  const tables = useLoaderData<TableType[]>();
  const fetcher = useFetcher<{ error: string; status: number }>();

  const deleteTable = async (id: string) => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/tables/${id}/destroy`,
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error, {
          id: "delete-table",
        });
      } else {
        toast.success("Tabla eliminada exitosamente", {
          id: "delete-table",
        });
      }
    }
    if (fetcher.state === "submitting") {
      toast.loading("Eliminando...", {
        id: "delete-table",
      });
    }
  }, [fetcher]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">
          Gestión de Mesas
        </h1>
        <Link
          to="/admin/tables/create"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-medium text-white hover:bg-accent-600"
        >
          <Icon icon="tabler:table-plus" width="24" height="24" />
        </Link>
      </div>
      <Table tables={tables} onDelete={deleteTable} />
    </div>
  );
}
