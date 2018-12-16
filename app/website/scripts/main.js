

export default class Main {
	
	static async main(){
		Loader.init();
		Dropdown.init();
		Visualization.init();
		Session.init();
		Events.init();
	
		const result = await Loader.execCommand("loadProblem", { n: "4Rooks"});
		if(result.success) Session.setProblem(Problem.fromObject(JSON.parse(result.data)));
	
		Session.visualize();
	}
	
}

Main.main();