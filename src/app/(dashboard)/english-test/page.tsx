export default function EnglishPage() {
  const roundOne = [
    {
      title: "Email / Chat",
      description: "Write professional emails or chat responses.",
    },
    {
      title: "Reading Comprehension",
      description: "Read a paragraph and answer questions (4 passages).",
    },
    {
      title: "Listening Comprehension",
      description:
        "Listen to a conversation, story, or situation and answer questions.",
    },
    {
      title: "Spoken Communication",
      description:
        "Answer 2 questions on topics like work from home, culture, or hobbies.",
    },
    {
      title: "Business Communication Writing",
      description: "Write responses to 2 business-related communication prompts.",
    },
    {
      title: "Grammar",
      description: "Identify and correct errors in given sentences.",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">English Test</h1>

      <div className="w-full max-w-3xl space-y-4">
        {roundOne.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-2xl shadow-sm bg-white hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-gray-700">{index + 1}. {item.title}</h2>
            <p className="text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
