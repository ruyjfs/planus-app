enum TasksTypes {
  LOAD = '@tasks/LOAD',
  LOAD_SUCCES = '@tasks/LOAD_SUCCES',
  REFRESH = '@tasks/REFRESH',
  SAVE = '@tasks/SAVE',
  DEL = '@tasks/DEL',
  SAVE_SUCCES = '@tasks/SAVE_SUCCES',
  COMMENTS_ADD = '@tasks/comments/ADD',
  COMMENTS_LOAD = '@tasks/comments/LOAD',
  COMMENTS_LOAD_SUCCESS = '@tasks/comments/LOAD_SUCCESS',
  VIEWS_LOAD = '@tasks/views/LOAD',
}

enum FocusTypes {
  LOAD = '@focus/LOAD',
  LOAD_SUCCES = '@focus/LOAD_SUCCES',
  SAVE = '@focus/SAVE',
  SAVE_SUCCES = '@focus/SAVE_SUCCES',
}

enum LoadTypes {
  REQUEST = 'load/REQUEST',
  SUCCES = 'load/SUCESS',
  FAILURE = 'load/FAILURE',
}

const Types = {
  TASKS: TasksTypes,
  FOCUS: FocusTypes,
  LOAD: LoadTypes,
};

export default Types;
