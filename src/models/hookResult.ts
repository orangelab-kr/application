type GetValueType<t> = t | null | undefined;
type SetValueType<t> = React.Dispatch<
  React.SetStateAction<t | null | undefined>
>;

export type HookResult<t> = [GetValueType<t>, SetValueType<t>];
