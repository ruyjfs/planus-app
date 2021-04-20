enum TasksTypes {
  ADD = 'tasks/ADD',
  REFRESH = 'tasks/REFRESH',
  DEL = 'tasks/DEL',
  BY_USER_ADD = 'tasks/BY_USER_ADD',
  DELETE = 'tasks/DELETE',
  COMMENTS_ADD = 'tasks/COMMENTS_ADD',
  VIEWS_ADD = 'tasks/VIEWS_ADD',
}

enum FocusTypes {
  ADD = 'focus/ADD',
  REFRESH = 'focus/REFRESH',
  DEL = 'focus/DEL',
}

enum AppTypes {
  ADD = 'app/ADD',
  CHECKPOINT_ADD = 'app/CHECKPOINT_ADD',
  SETTINGS_ADD = 'app/SETTINGS_ADD',
}

const Types = {
  TASKS: TasksTypes,
  FOCUS: FocusTypes,
  APP: AppTypes,
};

export default Types;
