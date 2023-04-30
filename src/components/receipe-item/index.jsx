

const RecipeItem = (props) => {
    const {id,image,title} = props; //destructor
    // console.log('items',props);
    return (
        <div key={id}>
            <div><img src={image} alt={title} /></div>
            <p>{title}</p>
            <button>Add to favorite</button>
        </div>
    )
}
export default RecipeItem;