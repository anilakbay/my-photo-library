"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Blend,
  ChevronLeft,
  ChevronDown,
  Crop,
  Info,
  Pencil,
  Trash2,
  Wand2,
  Image as LucideImage,
  Ban,
} from "lucide-react";
import Container from "@/components/Container";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface Deletion {
  state: string;
}

const MediaViewer = ({
  resource,
}: {
  resource: { id: string; width: number; height: number };
}) => {
  const sheetFiltersRef = useRef<HTMLDivElement | null>(null);
  const sheetInfoRef = useRef<HTMLDivElement | null>(null);

  const [filterSheetIsOpen, setFilterSheetIsOpen] = useState(false);
  const [infoSheetIsOpen, setInfoSheetIsOpen] = useState(false);
  const [deletion, setDeletion] = useState<Deletion>();

  const canvasHeight = resource.height;
  const canvasWidth = resource.width;

  const imgStyles: Record<string, string | number> = {
    maxHeight: canvasHeight > canvasWidth ? "100vh" : "none", // 'none' kullanarak undefined yerine geçerli bir değer sağlıyoruz
    maxWidth: canvasWidth > canvasHeight ? resource.width : "none", // 'none' kullanarak undefined yerine geçerli bir değer sağlıyoruz
    width: "100%",
    height: "auto",
  };

  const closeMenus = () => {
    setFilterSheetIsOpen(false);
    setInfoSheetIsOpen(false);
    setDeletion(undefined);
  };

  const handleOnDeletionOpenChange = (isOpen: boolean) => {
    if (!isOpen) setDeletion(undefined);
  };

  const handleOnOutsideClick = useCallback((event: MouseEvent) => {
    const excludedElements = Array.from(
      document.querySelectorAll('[data-exclude-close-on-click="true"]')
    );
    const clickedExcludedElement = excludedElements.some((element) =>
      event.composedPath().includes(element)
    );

    if (!clickedExcludedElement) closeMenus();
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleOnOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOnOutsideClick);
    };
  }, [handleOnOutsideClick]);

  return (
    <div className="h-screen bg-black px-0">
      <Dialog
        open={!!deletion?.state}
        onOpenChange={handleOnDeletionOpenChange}
      >
        <DialogContent data-exclude-close-on-click={true}>
          <DialogHeader>
            <DialogTitle className="text-center">
              Are you sure you want to delete?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet modal={false} open={filterSheetIsOpen}>
        <SheetContent
          ref={sheetFiltersRef}
          className="w-full sm:w-3/4 grid grid-rows-[1fr_auto] bg-zinc-800 text-white border-0"
          data-exclude-close-on-click={true}
        >
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-3 w-full bg-transparent p-0">
              <TabsTrigger value="enhance">
                <Wand2 />
                <span className="sr-only">Enhance</span>
              </TabsTrigger>
              <TabsTrigger value="crop">
                <Crop />
                <span className="sr-only">Crop & Resize</span>
              </TabsTrigger>
              <TabsTrigger value="filters">
                <Blend />
                <span className="sr-only">Filters</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="enhance">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Enhancements
                </SheetTitle>
              </SheetHeader>
              <ul className="grid gap-2">
                <li>
                  <Button
                    variant="ghost"
                    className="text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white"
                  >
                    <Ban className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">None</span>
                  </Button>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="crop">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Cropping & Resizing
                </SheetTitle>
              </SheetHeader>
              <ul className="grid gap-2">
                <li>
                  <Button
                    variant="ghost"
                    className="text-left justify-start w-full h-14 border-4 bg-zinc-700 border-white"
                  >
                    <LucideImage className="w-5 h-5 mr-3" />
                    <span className="text-[1.01rem]">Original</span>
                  </Button>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="filters">
              <SheetHeader className="my-4">
                <SheetTitle className="text-zinc-400 text-sm font-semibold">
                  Filters
                </SheetTitle>
              </SheetHeader>
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <Image
                    width={resource.width}
                    height={resource.height}
                    src="/icon-1024x1024.png"
                    alt="No Filter"
                    style={imgStyles}
                  />
                </li>
              </ul>
            </TabsContent>
          </Tabs>
          <SheetFooter className="gap-2 sm:flex-col">
            <div className="grid grid-cols-[1fr_4rem] gap-2">
              <Button
                variant="ghost"
                className="w-full h-14 text-left justify-center items-center bg-blue-500"
              >
                <span className="text-[1.01rem]">Save</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full h-14 text-left justify-center items-center bg-blue-500"
                  >
                    <span className="sr-only">More Options</span>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  data-exclude-close-on-click={true}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span>Save as Copy</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              variant="outline"
              className="w-full h-14 text-left justify-center items-center bg-transparent border-zinc-600"
              onClick={closeMenus}
            >
              <span className="text-[1.01rem]">Close</span>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet modal={false} open={infoSheetIsOpen}>
        <SheetContent
          ref={sheetInfoRef}
          className="w-full sm:w-3/4 grid grid-rows-[auto_1fr_auto] bg-zinc-800 text-white border-0"
          data-exclude-close-on-click={true}
        >
          <SheetHeader className="my-4">
            <SheetTitle className="text-zinc-200 font-semibold">
              Info
            </SheetTitle>
          </SheetHeader>
          <div>
            <ul>
              <li className="mb-3">
                <strong className="block text-xs font-normal text-zinc-400 mb-1">
                  ID
                </strong>
                <span className="flex gap-4 items-center text-zinc-100">
                  {resource.id}
                </span>
              </li>
            </ul>
          </div>
          <SheetFooter>
            <Button
              variant="outline"
              className="w-full h-14 text-left justify-center items-center bg-transparent border-zinc-600"
              onClick={closeMenus}
            >
              <span className="text-[1.01rem]">Close</span>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Container className="fixed z-10 top-0 left-0 w-full h-16 flex items-center justify-between gap-4 bg-gradient-to-b from-black">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Button
              variant="ghost"
              className={buttonVariants({ variant: "default" })}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Button variant="outline" onClick={() => setInfoSheetIsOpen(true)}>
            <Info className="w-4 h-4 mr-2" />
            Info
          </Button>
          <Button variant="outline" onClick={() => setFilterSheetIsOpen(true)}>
            <LucideImage className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => setDeletion({ state: "open" })}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </Container>

      <main className="flex justify-center items-center h-full">
        <Image
          width={resource.width}
          height={resource.height}
          src="/icon-1024x1024.png"
          alt="Resource Preview"
          style={imgStyles}
        />
      </main>
    </div>
  );
};

export default MediaViewer;
