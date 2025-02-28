import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Badge } from "@/components/ui/badge";
import { Edit, File, Settings as SettingsIcon } from "lucide-react";

export default function Bindings() {
  const generalBindings = [
    { action: "New Note", shortcut: "Ctrl+N", platform: "all" },
    { action: "Save", shortcut: "Ctrl+S", platform: "all" },
    { action: "Find", shortcut: "Ctrl+F", platform: "all" },
    { action: "Settings", shortcut: "Ctrl+,", platform: "all" },
    { action: "Toggle Sidebar", shortcut: "Ctrl+B", platform: "all" },
  ];

  const editorBindings = [
    { action: "Bold", shortcut: "Ctrl+B", platform: "all" },
    { action: "Italic", shortcut: "Ctrl+I", platform: "all" },
    { action: "Underline", shortcut: "Ctrl+U", platform: "all" },
    { action: "Heading 1", shortcut: "Ctrl+1", platform: "all" },
    { action: "Heading 2", shortcut: "Ctrl+2", platform: "all" },
    { action: "Code Block", shortcut: "Ctrl+Shift+C", platform: "all" },
  ];

  const advancedBindings = [
    { action: "Quick Switch", shortcut: "Ctrl+P", platform: "all" },
    { action: "Command Palette", shortcut: "Ctrl+Shift+P", platform: "all" },
    { action: "Split View", shortcut: "Ctrl+\\", platform: "all" },
    { action: "Focus Next Pane", shortcut: "Ctrl+Tab", platform: "all" },
    { action: "Developer Tools", shortcut: "F12", platform: "all" },
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
              <TabsTrigger value="advanced" className="flex items-center gap-1">
                <SettingsIcon className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Shortcut</TableHead>
                    <TableHead>Platform</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generalBindings.map((binding) => (
                    <TableRow key={binding.action}>
                      <TableCell>{binding.action}</TableCell>
                      <TableCell>
                        {renderKeyBinding(binding.shortcut)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{binding.platform}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="editor">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Shortcut</TableHead>
                    <TableHead>Platform</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {editorBindings.map((binding) => (
                    <TableRow key={binding.action}>
                      <TableCell>{binding.action}</TableCell>
                      <TableCell>
                        {renderKeyBinding(binding.shortcut)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{binding.platform}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="advanced">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Shortcut</TableHead>
                    <TableHead>Platform</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {advancedBindings.map((binding) => (
                    <TableRow key={binding.action}>
                      <TableCell>{binding.action}</TableCell>
                      <TableCell>
                        {renderKeyBinding(binding.shortcut)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{binding.platform}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
