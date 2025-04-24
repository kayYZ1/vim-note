import { useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import * as d3 from "d3";

import { db } from "@/lib/db";
import { getCurrentDate } from "@/lib/utils";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  type: "folder" | "note";
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

export default function GraphView() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const folders = useLiveQuery(() => db.folders.toArray());
  const notes = useLiveQuery(() => db.notes.toArray());

  const date = getCurrentDate();

  const { nodes, links } = useMemo(() => {
    const nodes: Node[] = [];
    const links: Link[] = [];

    if (!folders || !notes) {
      return { nodes, links };
    }

    folders.forEach((folder) => {
      nodes.push({
        id: folder.id,
        title: folder.name,
        type: "folder",
      });
    });

    notes.forEach((note) => {
      nodes.push({
        id: note.id,
        title: note.title,
        type: "note",
      });

      folders.forEach((folder) => {
        const containsNote = folder.notes.some(
          (folderNote) => folderNote.id === note.id,
        );
        if (containsNote) {
          links.push({
            source: folder.id,
            target: note.id,
          });
        }
      });
    });

    return { nodes, links };
  }, [folders, notes]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !nodes.length) {
      return;
    }

    const svgElement = svgRef.current;

    d3.select(svgElement).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    d3.select(svgElement).attr("width", width).attr("height", height);

    const svg = d3
      .select(svgElement)
      .attr("viewBox", [0, 0, width, height])
      .call(
        d3
          .zoom<SVGSVGElement, unknown>()
          .extent([
            [0, 0],
            [width, height],
          ])
          .scaleExtent([0.5, 3])
          .on("zoom", (event) => {
            container.attr("transform", event.transform);
          }),
      );

    const container = svg.append("g");

    const folderSize = 16;
    const noteRadius = 12;

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(50),
      )
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(noteRadius * 1.5));

    const link = container
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#9ca3af")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.6);

    const node = container
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call((g) => {
        g.filter((d) => d.type === "folder")
          .append("rect")
          .attr("x", -folderSize)
          .attr("y", -folderSize)
          .attr("width", folderSize * 2)
          .attr("height", folderSize * 2)
          .attr("rx", 4)
          .attr("fill", "#4b5563");

        g.filter((d) => d.type === "note")
          .append("circle")
          .attr("r", noteRadius)
          .attr("fill", "#d1d5db")
          .attr("stroke", "#374151")
          .attr("stroke-width", 1.5)
          .style("cursor", "pointer")
          .on("click", (_, d) => {
            navigate(`/note/${d.id}`);
          });

        g.append("text")
          .text((d) => d.title)
          .attr("x", (d) =>
            d.type === "folder" ? folderSize + 4 : noteRadius + 4,
          )
          .attr("y", 4)
          .attr("font-size", "12px")
          .attr("fill", "#6b7280");
      });

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => {
          const source =
            typeof d.source === "string"
              ? nodes.find((n) => n.id === d.source)
              : d.source;
          return source?.x || 0;
        })
        .attr("y1", (d) => {
          const source =
            typeof d.source === "string"
              ? nodes.find((n) => n.id === d.source)
              : d.source;
          return source?.y || 0;
        })
        .attr("x2", (d) => {
          const target =
            typeof d.target === "string"
              ? nodes.find((n) => n.id === d.target)
              : d.target;
          return target?.x || 0;
        })
        .attr("y2", (d) => {
          const target =
            typeof d.target === "string"
              ? nodes.find((n) => n.id === d.target)
              : d.target;
          return target?.y || 0;
        });

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    return () => {
      simulation.stop();
      d3.select(svgElement).selectAll("*").remove();
    };
  }, [nodes, links, navigate]);

  return (
    <div ref={containerRef} className="w-full max-w-none overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Graph View</h1>
        <h1 className="font-bold text-muted-foreground">{date}</h1>
      </div>
      <div
        className="w-full h-[700px] rounded-sm"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(128, 128, 128, 0.1) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          boxShadow:
            "0 4px 24px 0 rgba(0,0,0,0.12), 0 0px 2px 0 rgba(0,0,0,0.08)",
        }}
      >
        <svg ref={svgRef} className="w-full h-full cursor-grab" />
      </div>
      <div className="flex justify-center items-center mt-6 gap-6 text-base">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600">
          <span className="font-semibold text-primary">Folders</span>
          <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
            {folders?.length ?? 0}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600">
          <span className="font-semibold text-primary">Notes</span>
          <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
            {notes?.length ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
