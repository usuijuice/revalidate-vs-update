"use server";

import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export async function revalidateDataTagAction() {
  revalidateTag("data-tag", "max");
}

export async function updateDataTagAction() {
  updateTag("data-tag");
}

export async function revalidateTestPath() {
  revalidatePath("/test");
}
