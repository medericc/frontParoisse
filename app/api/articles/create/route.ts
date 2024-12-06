import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Requête reçue :", body);
    const { title, content, imageURL, publishedAt, username, categoryID } = body;

    // Validation côté serveur
    if (!title || !content || !username || !categoryID) {
      return NextResponse.json(
        { error: "Tous les champs requis ne sont pas remplis." },
        { status: 400 }
      );
    }

    // Envoi des données au backend Go
    const response = await fetch("http://localhost:8080/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, image_url: imageURL, published_at: publishedAt, username, category_id: categoryID }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const article = await response.json();
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de l'article." },
      { status: 500 }
    );
  }
}
