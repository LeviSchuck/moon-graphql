import Moon from 'moon';
import GraphqlDriver from './graphql-driver';

function component() {
  const element = document.createElement('div');
  element.setAttribute("id", "root")
  return element;
}

document.body.appendChild(component());

Moon.use({
	data: Moon.data.driver({
		todo: "",
		todos: [
			"Learn Moon",
			"Take a nap",
			"Go Shopping"
		]
	}),
  view: Moon.view.driver("#root"),
  graphql: GraphqlDriver({
    endpoint: "https://graphql-pokemon.now.sh/"
  })
});

import {Todos} from './view.moon'

Moon.run(({ data }) => ({
	view: Todos({data: data})
}));

