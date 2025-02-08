import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const properties = await prisma.property.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        price: true,
        StatusProperty: true,
        feature :{
            select: {
                bathrooms: true,
                bedrooms: true,
                area: true,
                propertyId: true,
            }
        }
         // Add other fields you want to include
      },
    });

        return NextResponse.json(properties);
      } catch (error) {
        return NextResponse.json({ error: "Error Fetching properties" }, { status: 500 });
      }
    }


