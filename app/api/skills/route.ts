import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "db", "techexpdata.json");

export async function GET() {
    try {
        const data = await fs.readFile(DATA_PATH, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: "Failed to read skills data" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newSkills = await request.json();
        await fs.writeFile(DATA_PATH, JSON.stringify(newSkills, null, 2));
        return NextResponse.json({ message: "Skills updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update skills data" }, { status: 500 });
    }
}
