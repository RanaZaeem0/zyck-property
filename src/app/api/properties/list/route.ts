import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

// Fetching Properties API
export async function GET(req: Request) {
    // try {
    const { searchParams } = new URL(req.url);
    const typeId = searchParams.get('typeId');
    const statusId = searchParams.get('statusId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const statusProperty = searchParams.get('statusProperty');

    const whereClause: any = {};
    if (typeId) whereClause.typeId = parseInt(typeId);
    if (statusId) whereClause.statusId = parseInt(statusId);
    if (minPrice) whereClause.price = parseInt(minPrice);
    if (maxPrice) whereClause.price = parseInt(maxPrice);
    if (statusProperty) whereClause.StatusProperty = statusProperty.toUpperCase();

    const properties = await prisma.property.findMany({
        where: whereClause,
        include: {
            type: true,
            status: true,
            location: {
                select: {
                    city: true,
                    stateId: true
                }
            },
            feature: true,
            images: true,
            contact: true,
        }
    })
    return NextResponse.json(properties)
    // } catch (error) {
    //     return NextResponse.json({error: "Error Fetching Properties"}, {status: 404})
    // }
}