import TopNav from "../component/TopNav";
// import axios from "axios";

// interface StatisticData {
//   id: number;
//   date: string;
//   companyName: string;
//   type: string;
//   position: string;
//   phone: string;
//   email: string;
//   status: string;
//   name: string;
// }

const News: React.FC = () => {
  return (
    <>
      <div className="w-full bg-gray-50">
        <TopNav title="News" />
        <main className="mt-8 pl-8">
          <div className="flex items-center flex-wrap gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                {/* <span>{applications.length}</span> */}
                applicants
              </p>
              <small>Based your preferences</small>
            </div>
            <div className="flex px-4 flex-wrap justify-center items-center gap-4">
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-indigo-600 text-white">
                  All
                </button>
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  Pending
                </button>
              </span>
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  On-hold
                </button>
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  Candidate
                </button>
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default News;
