"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X, Save } from "lucide-react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { CloudinaryResource } from "@/types/cloudinary";

import { useResources } from "@/hooks/use-resources";

interface MediaGalleryProps {
  resources: Array<CloudinaryResource>;
  tag?: string;
}

const MediaGallery = ({
  resources: initialResources,
  tag,
}: MediaGalleryProps) => {
  const { resources } = useResources({
    initialResources,
    tag,
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [creation, setCreation] = useState<string | undefined>(undefined);

  const handleOnClearSelection = () => setSelected([]);

  const handleOnCreationOpenChange = (isOpen: boolean) => {
    if (!isOpen) setCreation(undefined);
  };

  const handleOnSelectResource = (checked: boolean, id: string) => {
    setSelected((prev) =>
      checked
        ? Array.from(new Set([...prev, id]))
        : prev.filter((item) => item !== id)
    );
  };

  return (
    <>
      <Dialog open={!!creation} onOpenChange={handleOnCreationOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save your creation?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="justify-end sm:justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save to Library
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selected.length > 0 && (
        <Container className="fixed z-50 top-0 left-0 w-full h-16 flex items-center justify-between gap-4 bg-white shadow-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleOnClearSelection}>
              <X className="h-6 w-6" />
              <span className="sr-only">Clear Selected</span>
            </Button>
            <p>{selected.length} Selected</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Plus className="h-6 w-6" />
                <span className="sr-only">Create New</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Option</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Container>
      )}

      <Container>
        <form>
          {Array.isArray(resources) && (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-12 gap-4">
              {resources.map(({ id, public_id, secure_url, width, height }) => {
                const isChecked = selected.includes(id);

                return (
                  <li key={id} className="bg-white dark:bg-zinc-700">
                    <div className="relative group">
                      <label
                        className={`absolute top-3 left-3 p-1 transition-opacity ${
                          isChecked ? "opacity-100" : "opacity-0"
                        } group-hover:opacity-100`}
                        htmlFor={id}
                      >
                        <span className="sr-only">
                          Select Image &quot;{id}&quot;
                        </span>
                        <Checkbox
                          className={`w-6 h-6 rounded-full bg-white shadow ${
                            isChecked ? "border-blue-500" : "border-zinc-200"
                          }`}
                          id={id}
                          onCheckedChange={(checked) =>
                            handleOnSelectResource(checked as boolean, id)
                          }
                          checked={isChecked}
                        />
                      </label>
                      <Link
                        className={`block cursor-pointer border-8 transition-[border] ${
                          isChecked ? "border-blue-500" : "border-white"
                        }`}
                        href={`/resources/${resource.asset_id}`}
                      >
                        <Image
                          width={width}
                          height={height}
                          src={secure_url}
                          alt={public_id}
                          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive resim boyutları
                        />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </form>
      </Container>
    </>
  );
};

export default MediaGallery;
