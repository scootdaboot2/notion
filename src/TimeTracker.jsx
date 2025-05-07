""import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { format, differenceInMinutes, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, eachDayOfMonth } from "date-fns";

const TimeTracker = () => {
  const [entries, setEntries] = useState([]);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState({});
  const [weeklySummary, setWeeklySummary] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewDate, setViewDate] = useState(new Date());
  const [dayEntries, setDayEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    generateCalendarView();
    generateWeeklySummary();
    generateMonthlySummary();
  }, [entries]);

  const handleAddEntry = () => {
    if (task && category && startTime && endTime) {
      const start = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${startTime}`);
      const end = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${endTime}`);
      const hours = differenceInMinutes(end, start) / 60;

      if (editIndex !== null) {
        const updatedEntries = [...entries];
        updatedEntries[editIndex] = { task, category, start, end, hours, notes };
        setEntries(updatedEntries);
        setEditIndex(null);
      } else {
        setEntries([
          ...entries,
          { task, category, start, end, hours, notes },
        ]);
      }

      setTask("");
      setCategory("");
      setStartTime("");
      setEndTime("");
      setNotes("");
    }
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setTask(entry.task);
    setCategory(entry.category);
    setStartTime(format(entry.start, "HH:mm"));
    setEndTime(format(entry.end, "HH:mm"));
    setNotes(entry.notes);
    setSelectedDate(entry.start);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const filteredEntries = entries
    .filter(entry => 
      entry.task.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
      entry.notes.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date") return new Date(a.start) - new Date(b.start);
      if (sortOption === "hours") return b.hours - a.hours;
      return 0;
    });

  return (
    <div className="p-4">
      <div className="flex mb-4 space-x-2">
        <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Select onChange={(e) => setSortOption(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="hours">Sort by Hours</option>
        </Select>
      </div>

      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl mb-2">Entries</h2>
          {filteredEntries.map((entry, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>Task:</strong> {entry.task}</p>
              <p><strong>Category:</strong> {entry.category}</p>
              <p><strong>Hours:</strong> {entry.hours.toFixed(2)}</p>
              <p><strong>Notes:</strong> {entry.notes}</p>
              <Button className="mt-2 mr-2" onClick={() => handleEdit(index)}>Edit</Button>
              <Button className="mt-2" onClick={() => handleDelete(index)}>Delete</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracker;
""

