"use client";
import React from "react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteQuestion } from "@/lib/action/question.action";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { deleteAnswer } from "@/lib/action/answer.action";

const EditDeletePost = ({ id, type }: { id: string; type: string }) => {
  const pathname = usePathname();

  const handlePostDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({ questionId: id, path: pathname });
    } else if (type === "Answer") {
      await deleteAnswer({ _id: id, path: pathname });
    }
  };

  return (
    <div className="flex gap-3">
      <Link href={`/question/edit/${id}`}>
        {type !== "Answer" && (
          <Image
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        )}
      </Link>

      <AlertDialog>
        <AlertDialogTrigger className="size-[20px]">
          <Image
            src={"/assets/icons/trash.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-dark200_light900">
              Are you sure you want to delete your post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please confirm if you wish to
              proceed with the deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-dark200_light900 background-light900_dark200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handlePostDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeletePost;
