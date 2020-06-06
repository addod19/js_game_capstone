const form = () => {
    let f = document.createElement('form');
    let fInput = document.createElement('input');
    fInput.setAttribute('name', 'name');

    let btn = document.createElement('button');
    btn.setAttribute('id', 'sendName');
    btn.setAttribute('name', 'send');

    f.append(fInput, btn);
}

export default form;