import { useLocation } from "react-router"
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { getCurrentDate } from "@/lib/utils";
import EditableNote from "./components/editable-note";

export default function Note() {
  const location = useLocation();
  const todaysDate = getCurrentDate();

  const paths = location.pathname.split("/").filter((path) => path !== "")

  return (
    <div className="py-4 px-2">
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, idx) => (
              <BreadcrumbItem key={idx}>
                {path}
              </BreadcrumbItem>
            ))}
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="text-muted-foreground">
          {todaysDate}
        </p>
      </div>
      <section className="flex flex-col py-4 gap-4">
        <h1 className="font-semibold text-3xl">
          Note title
        </h1>
        <h3 className="text-xl backdrop-opacity-95">
          Loose note description
        </h3>
        <div className="text-muted-foreground text-justify">
          <EditableNote />
        </div>
      </section>
    </div>
  )
}