# **team7-week3-2**

원티드 프론트엔드 프리온보딩 7차 7팀 3-2 과제 레포리토리입니다

### 실행 방법

1. (프로젝트 루트 디렉토리에서) cd frontend
2. yarn dev 혹은 yarn build && yarn start
3. (프로젝트 루트 디렉토리에서) cd backend
4. yarn start

### **폴더구조**

```
📦src
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂Search
 ┃ ┃ ┃ ┣ 📜Search.tsx
 ┃ ┃ ┃ ┗ 📜useInput.ts
 ┃ ┃ ┗ 📜Layout.tsx
 ┃ ┗ 📂views
 ┃ ┃ ┣ 📂404
 ┃ ┃ ┃ ┣ 📜404Container.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂500
 ┃ ┃ ┃ ┣ 📜500Container.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Accounts
 ┃ ┃ ┃ ┣ 📜Accounts.utils.ts
 ┃ ┃ ┃ ┣ 📜AccountsContainer.tsx
 ┃ ┃ ┃ ┣ 📜accountStatus.ts
 ┃ ┃ ┃ ┣ 📜brokerInfo.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂SignIn
 ┃ ┃ ┃ ┣ 📜SignInContainer.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Users
 ┃ ┃ ┃ ┗ 📜UsersContainer.tsx
 ┃ ┃ ┗ 📂UsersCRUD
 ┃ ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┃ ┗ 📜useUserCRUD.ts
 ┃ ┃ ┃ ┣ 📂models
 ┃ ┃ ┃ ┃ ┗ 📜User.ts
 ┃ ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┃ ┗ 📜users.service.ts
 ┃ ┃ ┃ ┗ 📜UsersCRUDContainer.tsx
 ┣ 📂pages
 ┃ ┣ 📂accounts
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┣ 📜[pid].ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📜accounts.ts
 ┃ ┃ ┗ 📜sign-in.ts
 ┃ ┣ 📂dashboard
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂sign-in
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂users
 ┃ ┃ ┣ 📜[pid].tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂usersCRUD
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜404.tsx
 ┃ ┣ 📜500.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂services
 ┃ ┣ 📂sign
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜cacheKeys.ts
 ┣ 📂stores
 ┃ ┣ 📜accessToken.recoil.ts
 ┃ ┣ 📜fullUsers.recoil.ts
 ┃ ┗ 📜storeKeys.ts
 ┗ 📂styles
 ┃ ┗ 📜globals.css
```

1. api: api 관리
2. components :
    1. common : 공통으로 사용되는 컴포넌트 디렉토리
    2. views : 각 페이지별로 보여지는 부분을 담당하는 컴포넌트 디렉토리
3. pages : 각 페이지의 레이아웃을 담당하는 컴포넌트 디렉토리
4. styles: 공통으로 사용되는 스타일 관리

### 레이아웃 구성

```tsx
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	...
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
	...
}
```

- getLayout을 통해 특별하게 관리되어야하는 페이지가 있다면 다르게 표현할 수 있도록 처리

### 사용자 상세화면

```tsx
// [pid].tsx
import UsersContainer from "components/views/Users/UsersContainer";
import React from "react";

function UsersPage() {
  return <UsersContainer />;
}

export default UsersPage;
```

- Dynamic Routing을 통해 유저의 id를 받고 그에 맞는 사용자를 보여줌.

### 사용자 CUD

```tsx
function useUserCRUD() {
  const [fullUsers, setFullUsers] = useFullUsersState();
  const lastUserId = useRef<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFullUsers();
      setFullUsers(data);
      lastUserId.current = data.length;
    };
    fetchData();
  }, []);

  const createUser = (size: number) => {
    const newUser: User = {
      id: size + 1,
      
			...
      
			updated_at: faker.date.between("2019-04-01", "2022-08-01").toString(),
    };
    setFullUsers((prev) => [...prev, newUser]);
    lastUserId.current += 1;
  };

  const updateUserName = ({ userId, userName}) => {
    const newUsers = fullUsers.map((user) => {
      if (user.id === parseInt(userId)) {
        return { ...user, name: userName };
      }
      return user;
    });
    setFullUsers(newUsers);
  };

  const deleteUser = (userId: string) => {
    const newUsers = fullUsers.filter((user) => {
      if (user.id !== parseInt(userId)) {
        return true;
      }
      return false;
    });
    setFullUsers(newUsers);
  };

  return {
    lastUserId: lastUserId.current,
    createUser,
    updateUserName,
    deleteUser,
    fullUsers,
  };
}

export default useUserCRUD;
```

- users 전체 목록을 DB처럼 사용
- JsonServer에 구현되어 있는 함수를 활용하여 Create 구현
- Map, Filter를 통해 Update, Delete 구현

### 계좌 목록

```tsx
const [page, setPage] = useState(1);
  const [searchText, handleSearch] = useInput("");
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery(["accounts"], () =>
    getItems(page, searchText)
  );
  const accounts = data?.data;

  const decreasePage = () => setPage((page) => (page > 1 ? page - 1 : page));
  const increasePage = () =>
    setPage((page) => (accounts?.length !== 0 ? page + 1 : page));

  const moveUserPage = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const onSearch: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [page]);
```

- page가 변경될 때마다 refech가 동작 되도록 구현
- useRouter를 이용해 계좌 클릭시 사용자의 상세 페이지 url로 이동하도록 구현
- 데이터의 형식을 변환하는 함수는 “./Accounts.utils“ 파일에 작성