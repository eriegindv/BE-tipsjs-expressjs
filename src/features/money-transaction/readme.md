1. Create network `docker network create mongoNet`

2. Khi tạo dữ liệu ở r0 thì r1, r2 tự động có dữ liệu. Khi r0 chết, r1 tiếp tục thay thế đọc và ghi dữ liệu, còn r2 clone dữ liệu

   ```
   docker run -dp 27018:27017 --net mongoNet --name r0 mongo:latest --replSet mongoRepSet
   ```

   ```
   docker run -dp 27019:27017 --net mongoNet --name r1 mongo:latest --replSet mongoRepSet
   ```

   ```
    docker run -dp 27020:27017 --net mongoNet --name r2 mongo:latest --replSet mongoRepSet
    ```

3. Truy cập vào r0
   `docker exec -it r0 bash`

    3.1 Check mongo `mongo`

    3.2 Check status `rs.status()`

    3.3 Config 
    ```
    config = {"_id": "mongoRepSet", "members": [{_id: 0, host: "10.89.30.30:27018"}, {_id: 1, host: "10.89.30.30:27019"}, {_id: 2, host: "10.89.30.30:27020"}]}
    ```

    ```
    rs.initiate(config)
    ```

    3.4 Check database
    Lúc này, ta đang ở mongoRepSet:SECONDARY `show dbs`
    
    -> chuyển thành PRIMARY `rs.status()`

4. Dùng db test `use test`
   
   4.1 tạo thử data ở r0
   ```
   db.test.insert({name: "anonystick"})
   ```

   4.2 check data
   ```
   db.test.find()
   ```

5. Kiểm tra ở r1

    5.1 Tạo terminal mới
    ```
    docker exec -it r1 bash
    ```

    5.2 
    ```
    rs.secondaryOk()
    ```

    5.3 Check xem db test có chưa
    ```
    show dbs
    ```

    5.4 Dùng db test
    ```
    use test
    ```

    5.5 Xem data đã được set chưa
    ```
    db.test.find()
    db.test.insert({name: "eriegin"})
    ```