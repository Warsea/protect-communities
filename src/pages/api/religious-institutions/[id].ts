import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { temple, division, whatsappGroup, protectingInstitution } = req.body;
    const updatedInstitution = await prisma.religiousInstitution.update({
      where: { id: Number(id) },
      data: {
        temple,
        division,
        whatsappGroup,
        protectingInstitution,
      },
    });
    res.status(200).json(updatedInstitution);
  } else if (req.method === "DELETE") {
    await prisma.religiousInstitution.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
