import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/lib/db";
import { Folder, Note } from "@/lib/interfaces";
import { useThemeToggle } from "@/shared/hooks/use-theme";
import { useNavigate } from "react-router";

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

  const { theme } = useThemeToggle();
  const navigate = useNavigate();

  const folders = useLiveQuery(() => db.folders.toArray());
  const notes = useLiveQuery(() => db.notes.toArray());

  useEffect(() => {
    if (folders && notes) {
      createGraph(notes, folders); // Improve this
    }
  }, [folders, notes, theme]);

  if (!notes) {
    return;
  }

  const nodes: Node[] = [];
  const links: Link[] = [];

  const createGraph = (notes: Note[], folders?: Folder[]) => {
    if (!svgRef.current || !containerRef.current) {
      return;
    }

    folders?.forEach((folder) => {
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

      folders?.forEach((folder) => {
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

    const isDarkTheme = theme === "dark";

    const colors = {
      textColor: isDarkTheme ? "#e5e7eb" : "#1f2937",
      linkColor: isDarkTheme ? "#9ca3af" : "#6b7280",
      folderColor: isDarkTheme ? "#6b7280" : "#4b5563",
      noteColor: isDarkTheme ? "#d1d5db" : "#9ca3af",
    };

    d3.select(svgRef.current).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    d3.select(svgRef.current).attr("width", width).attr("height", height);

    const svg = d3
      .select(svgRef.current)
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
      .forceSimulation<Node>()
      .force(
        "link",
        d3
          .forceLink<Node, Link>()
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
      .attr("stroke", colors.linkColor)
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
          .attr("fill", colors.folderColor);

        g.filter((d) => d.type === "note")
          .append("circle")
          .attr("r", noteRadius)
          .attr("fill", colors.noteColor)
          .attr("stroke", colors.folderColor)
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
          .attr("fill", colors.textColor); 
      });

    simulation.nodes(nodes);
    (simulation.force("link") as d3.ForceLink<Node, Link>).links(links);

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
  };

  const isDarkTheme = theme === "dark";
  const dotsOnBackground = {
    backgroundImage: `radial-gradient(circle, ${
      isDarkTheme ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.1)"
    } 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
  };

  return (
    <div ref={containerRef} className="w-full max-w-none overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Graph View</h1>
      </div>
      <div
        className="w-full h-[700px] rounded-lg shadow-md border-1"
        style={dotsOnBackground}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ cursor: "grab" }}
        />
      </div>
    </div>
  );
}
