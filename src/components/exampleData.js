let exampleTopicData = [
	{
		title: "Example title",
		description: "These cards are example data that resets on each page refresh. Fiddle around as much as you like or sign up and create your own!",
		estimatedTimeToMaster: 1,
		timeSpent: 0,
		source: "https://github.com/eekaks",
		startLearningDate: "2022-08-03T13:38:02.808Z",
		inProgress: true,
		completionDate: null,
		user: {
			username: "elaine",
			name: "Eetu Laine",
			id: "62e8fe44bf607a8d4e674938"
		},
		sortingid: "62e8fe44bf607a8d4e674938",
		id: "62ea7a3a320a8f26874225e8"
	},
	{
		title: "HTML",
		description: "Master the basics of HTML",
		estimatedTimeToMaster: 10,
		timeSpent: 0,
		source: "https://developer.mozilla.org/en-US/docs/Web/HTML",
		startLearningDate: "2022-08-03T13:38:02.808Z",
		inProgress: true,
		completionDate: null,
		user: {
			username: "elaine",
			name: "Eetu Laine",
			id: "62e8fe44bf607a8d4e674938"
		},
		sortingid: "62e8fe44bf607a8d4e674938",
		id: "62ea7a3a320a8f26874225d9"
	},
	{
		title: "CSS",
		description: "Master the basics of CSS",
		estimatedTimeToMaster: 5,
		timeSpent: 0,
		source: "https://developer.mozilla.org/en-US/docs/Web/CSS",
		startLearningDate: "2022-08-03T13:40:41.410Z",
		inProgress: true,
		completionDate: null,
		user: {
			username: "elaine",
			name: "Eetu Laine",
			id: "62e8fe44bf607a8d4e674938"
		},
		sortingid: "62e8fe44bf607a8d4e674938",
		id: "62ea7ad9320a8f26874225e7"
	},
	{
		title: "C#",
		description: "Master the basics of .NET full stack development in C#",
		estimatedTimeToMaster: 90,
		timeSpent: 0,
		source: "https://awacademy.fi/",
		startLearningDate: "2022-08-03T13:43:33.473Z",
		inProgress: true,
		completionDate: null,
		user: {
			username: "elaine",
			name: "Eetu Laine",
			id: "62e8fe44bf607a8d4e674938"
		},
		sortingid: "62e8fe44bf607a8d4e674938",
		id: "62ea7b85320a8f26874225f3"
	}
	]

let exampleTaskData = [
	{
		topic: "62ea7a3a320a8f26874225d9",
		title: "Lists",
		description: "Learn how ordered and unordered lists and their items work",
		deadline: "2022-08-11T00:00:00.000Z",
		priority: 2,
		done: false,
		notes: "Enter your notes here",
		id: "62ea7a6b320a8f26874225e2"
	},
	{
		topic: "62ea7a3a320a8f26874225d9",
		title: "Buttons",
		description: "Learn the properties of buttons and how to style them",
		deadline: "2022-08-05T00:00:00.000Z",
		priority: 1,
		done: false,
		notes: "Enter your notes here",
		id: "62ea7a7b320a8f26874225e4"
	},
	{
		topic: "62ea7ad9320a8f26874225e7",
		title: "Hover events",
		description: "Learn how to style items using hover",
		deadline: "2022-08-11T00:00:00.000Z",
		priority: 3,
		done: false,
		notes: "Enter your notes here",
		id: "62ea7af9320a8f26874225ea"
	},
	{
		topic: "62ea7ad9320a8f26874225e7",
		title: "Padding",
		description: "Learn how padding works",
		deadline: "2022-08-05T00:00:00.000Z",
		priority: 1,
		done: false,
		notes: "Enter your notes here",
		id: "62ea7b05320a8f26874225ec"
	},
	{
		topic: "62ea7ad9320a8f26874225e7",
		title: "Borders",
		description: "Learn how to style borders",
		deadline: "2022-08-10T00:00:00.000Z",
		priority: 2,
		done: true,
		notes: "Enter your notes here",
		id: "62ea7b64320a8f26874225ee"
	},
	{
		topic: "62ea7b85320a8f26874225f3",
		title: "Console app UI",
		description: "Learn how to make a user interface using the console",
		deadline: "2022-08-26T00:00:00.000Z",
		priority: 1,
		done: false,
		notes: "Enter your notes here",
		id: "62ea7b9c320a8f26874225f6"
	}
]

export { exampleTopicData, exampleTaskData }