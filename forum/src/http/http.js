// fetch 함수의 집합을 모아두는 곳
export const loadMyData = async ({ token }) => {
  const response = await fetch(`http://localhost:8080/api/v1/member`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const json = await response.json();
  return json;
};

export const login = async (email, password) => {
  const response = await fetch("http://localhost:8080/auth/token", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  return json;
};

export const loadBoardList = async ({ token, pageNo = 0 }) => {
  if (!token) {
    return undefined;
  }
  const response = await fetch(
    `http://localhost:8080/api/v1/boards?pageNo=${pageNo}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();
  return json;
};

export const loadOndBoard = async ({ token, selectedBoardId }) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();
  return json;
};

export const writeBoard = async (token, subject, content, file) => {
  // file 업로드를 위해 formData 생성. -> 이곳 작성한게 multipart/form-data로 전달.
  const formData = new FormData(); // Javascript bulit-in 객체.
  formData.append("subject", subject);
  formData.append("content", content);
  formData.append("file", file);
  const response = await fetch("http://localhost:8080/api/v1/boards", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });
  const json = await response.json();
  return json;
};

// 수정
export const modifyBoard = async (
  token,
  selectedBoardId,
  subject,
  content,
  file
) => {
  // 파일 업로드를 위해 formData 생성
  const formData = new FormData(); // Javascript built-in 객체.
  formData.append("subject", subject);
  formData.append("content", content);
  formData.append("file", file);

  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );
  const json = await response.json();
  return json;
};

export const deleteBoard = async (token, selectedBoardId) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/boards/${selectedBoardId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );
  const json = await response.json();
  return json;
};
