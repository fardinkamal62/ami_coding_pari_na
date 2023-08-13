const random = module.exports

random.text = () => {
    return (Math.random() + 1).toString(36).substr(2, 15);
}
