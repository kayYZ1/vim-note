import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getCurrentDate } from "@/lib/utils";
import { db } from "@/lib/db";
import EditableNote from "./components/editable-note";

export default function Note() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const todaysDate = getCurrentDate();

  const note = useLiveQuery(async () => {
    if (!id) return null;
    return await db.notes.get(+id);
  }, [id]);

  useEffect(() => {
    if (id) {
      localStorage.setItem("lastViewed", JSON.stringify(+id));
    }
  }, [id]);

  const paths = location.pathname.split("/").filter((path) => path !== "");

  return (
    <div className="py-4 px-2">
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, idx) => (
              <BreadcrumbItem key={idx}>{path}</BreadcrumbItem>
            ))}
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="text-muted-foreground">{todaysDate}</p>
      </div>
      <section className="flex flex-col py-4 gap-4">
        <h1 className="font-semibold text-3xl">{note?.title}</h1>
        <h3 className="text-xl backdrop-opacity-95">{note?.description}</h3>
        <div className="text-muted-foreground text-justify">
          <EditableNote />
        </div>
      </section>
    </div>
  );
}
