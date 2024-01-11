import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const query = request.nextUrl.searchParams.get("query");
  const page = request.nextUrl.searchParams.get("page");

  try {
    const res = await axios.request({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/${type}`,
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page: Number(page),
      },
      headers: {
        Accept: "application/json",
        Authorization: `${process.env.AUTH_KEY}`,
      },
    });
    const res_data = res.data.results.map((item: any) => {
      switch (type) {
        case "movie":
        case "tv":
          return {
            id: item.id,
            title: item.title || item.name,
            poster_path: item.poster_path,
            release_date: item.release_date || item.first_air_date,
          };
        case "person":
          return {
            id: item.id,
            name: item.name,
            profile_path: item.profile_path,
            gender: item.gender,
          };
      }
    });
    return NextResponse.json({
      message: "success",
      curr_page: res.data.page,
      total_pages: res.data.total_pages,
      data: res_data,
      no_result: res.data.total_results === 0,
    });
  } catch (error) {
    return new NextResponse("Cannot fetch search result", { status: 400 });
  }
}
