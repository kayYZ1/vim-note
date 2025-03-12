import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, File } from "lucide-react";

export default function Bindings() {
  const generalBindings = [
    { action: "New Note", shortcut: "Ctrl+N" },
    { action: "Save", shortcut: "Ctrl+S" },
    { action: "Find", shortcut: "Ctrl+F" },
    { action: "Settings", shortcut: "Ctrl+," },
    { action: "Toggle Sidebar", shortcut: "Ctrl+B" },
  ];

  const editorBindings = [
    { action: "Bold", shortcut: "**text**" },
    { action: "Italic", shortcut: "*text*" },
    { action: "Underline", shortcut: "__text__" },
    { action: "Strikethrough", shortcut: "~~text~~" },
    { action: "Heading 1", shortcut: "# Heading" },
    { action: "Heading 2", shortcut: "## Heading" },
    { action: "Heading 3", shortcut: "### Heading" },
    { action: "Code Inline", shortcut: "`code`" },
    {
      action: "Code Block",
      shortcut: "```language\ncode\n```",
    },
    { action: "Blockquote", shortcut: "> quote" },
    { action: "Unordered List", shortcut: "- item" },
    { action: "Ordered List", shortcut: "1. item" },
    { action: "Link", shortcut: "[text](url)" },
    { action: "Image", shortcut: "![alt](url)" },
    { action: "Horizontal Rule", shortcut: "---" },
    {
      action: "Table",
      shortcut: "| head | head |\n|------|------|\n| cell | cell |",
    },
  ];

  const renderKeyBinding = (key: string) => {
    const parts = key.split("+");
    return (
      <span className="flex items-center gap-1">
        {parts.map((part, i) => (
          <>
            <kbd className="px-2 py-1 text-xs rounded border inline-flex items-center justify-center min-w-8">
              {part}
            </kbd>
            {i < parts.length - 1 && <span>+</span>}
          </>
        ))}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">Keyboard Bindings</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Customize Your Keyboard Shortcuts</CardTitle>
          <CardDescription>
            View and customize keyboard shortcuts for faster navigation and
            editing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general" className="flex items-center gap-1">
                <File className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="editor" className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                Editor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Shortcut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generalBindings.map((binding) => (
                      <TableRow key={binding.action}>
                        <TableCell>{binding.action}</TableCell>
                        <TableCell>
                          {renderKeyBinding(binding.shortcut)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="editor">
              <div className="max-h-[50vh] overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Shortcut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editorBindings.map((binding) => (
                      <TableRow key={binding.action}>
                        <TableCell>{binding.action}</TableCell>
                        <TableCell className="whitespace-pre">
                          {binding.shortcut.split("\n").map((line, index) => (
                            <div key={index}>{renderKeyBinding(line)}</div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
