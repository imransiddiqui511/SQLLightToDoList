describe('Example Test Suite', () => {
  beforeAll(async () => {
    await device.launchApp(); // Launch the app before running tests
  });

  it('should have welcome screen', async () => {
    await expect(element(by.text('Items'))).toBeVisible(); // Replace 'Welcome' with a text element in your app
  });
});