import Moon from 'moon';

const updateTodo = ({ data, view }) => {
  data.todo = view.target.value;
	return {
		data,
		view: (<Todos data={data}/>)
	};
};

const createTodo = ({ data }) => {
  data.todos.push(data.todo);
  data.todo = "";

	return {
		data,
		view: (<Todos data={data}/>)
	};
};

const ATTACK_FRAG = `
fragment attack on Attack {
  name
  type
  damage
}`;

const PIKACHU_QUERY = `query {
  pokemon(name: "Pikachu") {
    attacks {
      special {
        ...attack
      }
    }
  }
}`;

const crazy = () => {
  return {
    graphql: {
      query: `
      ${PIKACHU_QUERY}
      ${ATTACK_FRAG}
      `,
      after: ({graphql, data}) => {
        if (graphql.success) {
          graphql.success.pokemon.attacks.special.forEach((attack) => {
            data.todos.push(`${attack.type}: ${attack.name}`);
          });
        }
        return {
          view: (<Todos data={data}/>)
        }
      }
    }
  }
}

const removeTodo = index => ({ data }) => {
  data.todos.splice(index, 1);

	return {
		data,
		view: (<Todos data={data}/>)
	};
};

const Todos = ({ data }) => (
	<div>
		<input type="text" value={data.todo} @input={updateTodo} />
		<button @click={createTodo} >Create</button>
    <button @click={crazy} >Crazy</button>

		<for={todo, index} of={data.todos} name="ul">
			<li @click={removeTodo(index)} >{todo}</li>
		</for>
	</div>
);

export {
  Todos
}