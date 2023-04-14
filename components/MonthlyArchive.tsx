import { getDatesOfRecentPosts } from "@/utilities/getDatesOfRecentPosts";
import Link from "next/link";

export async function MonthlyArchive() {
  const posts = await getDatesOfRecentPosts();

  const groupedPosts = posts.reduce((groups, post) => {
    const [year, month] = post.date.split("-");
    const matchingYear = groups.find(
      (existingYear) => existingYear.year === year
    );

    if (!matchingYear) {
      groups.push({ year, months: [{ month, count: 1 }] });
      return groups;
    }

    const matchingMonth = matchingYear.months.find(
      (existingMonth) => existingMonth.month === month
    );

    if (!matchingMonth) {
      matchingYear.months.push({ month, count: 1 });
      return groups;
    }

    matchingMonth.count += 1;
    return groups;
  }, [] as Array<YearData>);

  return (
    <>
      <h3 className="uppercase font-bold mb-4 text-xl">Monthly Archives</h3>
      <ul className="ml-4">
        {groupedPosts.map((year) => {
          return (
            <li key={year.year}>
              <Link
                href={`/blog/${year.year}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {year.year} (
                {year.months.reduce((sum, month) => sum + month.count, 0)})
              </Link>
              <ul className="ml-4">
                {year.months
                  .sort((a, b) => Number(a.month) - Number(b.month))
                  .map((month) => {
                    return (
                      <li key={`${year.year}-${month.month}`}>
                        <Link
                          href={`/blog/${year.year}/${month.month}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {formatMonth(month.month)} ({month.count})
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

interface YearData {
  year: string;
  months: Array<MonthData>;
}

interface MonthData {
  month: string;
  count: number;
}

function formatMonth(monthNumString: string): string {
  const formattedMonths = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  /* @ts-expect-error Key Type */
  return formattedMonths[monthNumString];
}
