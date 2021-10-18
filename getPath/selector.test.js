const selector = require('./selector');

const getPath = selector.getPath;
const InvalidArgumentException = selector.InvalidArgumentException;
describe('getPath', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section>
        <div>test</div>
        <div id="div-id" class="div-class1">a text message
          <p className="p-class1">description</p>
          <p id="p-id" class="p-class2">one more description</p>
        </div>
      </section>
      <section></section>
      <section id="section-id"></section>`;
  });
  it.each`
    element      | result
    ${undefined} | ${InvalidArgumentException}
    ${null}      | ${InvalidArgumentException}
    ${''}        | ${InvalidArgumentException}
  `('should throw InvalidArgumentException', ({ element, result }) => {
    expect(() => getPath(element)).toThrow(result);
  });

  it.each`
    id
    ${'p-id'}
    ${'div-id'}
    ${'section-id'}
  `('should return unique css selector', ({ id }) => {
    const element = document.getElementById(id);
    const cssSelector = getPath(element);

    expect(document.querySelectorAll(cssSelector)).toHaveLength(1);
  });
});
