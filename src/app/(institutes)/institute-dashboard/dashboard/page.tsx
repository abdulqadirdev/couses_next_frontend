"use client";
import { Chart } from "@/components/institute/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts";

// Data for student distribution (gender)
const studentData = [
  { name: "Male", value: 1200 },
  { name: "Female", value: 900 },
  { name: "Other", value: 100 },
];

// Data for the approved vs pending student applications
const applicationData = [
  { name: "Pending", value: 300 },
  { name: "Approved", value: 1900 },
];

// Data for the course categories (Bar chart)
const courseData = [
  { category: "Web Development", count: 30 },
  { category: "Data Science", count: 25 },
  { category: "AI & ML", count: 15 },
  { category: "Business & Marketing", count: 20 },
  { category: "Arts & Design", count: 10 },
];

// Total courses count
const totalCourses = 100;

// Color palette for charts
const COLORS = ["#4CAF50", "#FFC107", "#F44336"];
const applicationColors = ["#8BC34A", "#F44336"]; // Green for approved, Red for pending

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Total Courses</h2>
        <span className="text-4xl font-bold text-yellow-500">{totalCourses}</span>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Student Applications</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={applicationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
            >
              {applicationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={applicationColors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconSize={15} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Student Gender Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={studentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
            >
              {studentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconSize={15} />
          </PieChart>
        </ResponsiveContainer>
      </div>

     
      <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Course Categories</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={courseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fill: "#4A4A4A" }} />
            <YAxis tick={{ fill: "#4A4A4A" }} />
            <RechartsTooltip />
            <RechartsLegend iconSize={15} />
            <Bar dataKey="count" fill="#4CAF50" barSize={30} radius={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
