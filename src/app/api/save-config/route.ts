import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export async function POST(req: NextRequest) {
  try {
    const config = await req.json();

    const configPath = path.join(process.cwd(), "config", "site.json");
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

    // Auto commit and push
    execSync("git add config/site.json", { cwd: process.cwd() });
    execSync('git commit -m "chore: 更新网站内容"', { cwd: process.cwd(), stdio: "pipe" });
    execSync("git push origin master", { cwd: process.cwd(), stdio: "pipe" });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
