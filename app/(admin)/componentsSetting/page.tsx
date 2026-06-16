import React from 'react';
import { connection } from "next/server";

import { DocsBuilderDemo } from "@/features/docs-builder";
import { requireRole } from "@/lib/auth/server";
import { getStoredWorkspace } from "@/lib/docs/workspace-service";

import { ComponentsSetting } from '@/features/componentsSetting/index';

export default async function ComponentsSettingPage() {
  await connection();
  const session = await requireRole("admin");
  const workspace = await getStoredWorkspace();
  return <ComponentsSetting />;
}
