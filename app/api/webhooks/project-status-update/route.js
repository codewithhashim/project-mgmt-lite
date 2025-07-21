import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    const body = await request.json();
    const { projectId, newStatus, additionalMessage } = body;

    if (!projectId || !newStatus) {
      return NextResponse.json({ error: 'projectId and newStatus are required' }, { status: 400 });
    }

    console.log(`Received webhook for projectId: ${projectId}`);
    console.log(`New status: ${newStatus}`);
    if (additionalMessage) {
      console.log(`Additional message: ${additionalMessage}`);
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { status: newStatus },
    });

    // Revalidate the project page and the dashboard
    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath('/dashboard');

    return NextResponse.json({ message: 'Project status updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 