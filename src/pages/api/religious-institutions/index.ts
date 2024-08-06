import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const institutions = await prisma.religiousInstitution.findMany();
    res.status(200).json(institutions);
  } else if (req.method === "POST") {
    const { temple, division, whatsappGroup, protectingInstitution } = req.body;
    const newInstitution = await prisma.religiousInstitution.create({
      data: {
        temple,
        division,
        whatsappGroup,
        protectingInstitution,
      },
    });
    res.status(201).json(newInstitution);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
