export default {
  Query: {
    user(parent: any, args: any, context: any) {
      console.log('user context', context);

      const userId: string = args.id;

      return {
        id: '123',
        name: 'test',
        email: 'test@test.com',
        games: 1,
      };
    },
  },
};
