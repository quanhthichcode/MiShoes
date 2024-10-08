package com.example.backend.vnp_1;



import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PayService {
    private String  BASE_BACKEND_ENDPOINT = "http://localhost:8080";
    private String  Vnp_returnUrl = BASE_BACKEND_ENDPOINT+  "/ban-hang-client/payment-callback";
    private Config config;

    public Map<String, String> payWithVNPAY(String money) throws UnsupportedEncodingException {
Map<String, String> pay = new HashMap<>();
        int amount = Integer.parseInt(money) * 100;
        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_TmnCode = Config.vnp_TmnCode;
        Map<String, String> vnp_Params = new HashMap<>(); // Thông tin về QR Code
        vnp_Params.put("vnp_Version", Config.vnp_Version); // Phiên bản
        vnp_Params.put("vnp_Command", Config.vnp_Command); // Dòng lệnh
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode); // Mã TMN
        vnp_Params.put("vnp_Amount", String.valueOf(amount)); //
        vnp_Params.put("vnp_CurrCode", "VND"); //Đơn vị tiền tệ
        vnp_Params.put("vnp_BankCode", "NCB"); // Tên ngân hàng
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef); //
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef); // Thông tin yêu cầu
        vnp_Params.put("vnp_ReturnUrl", Vnp_returnUrl); // Địa chỉ được trả về
        vnp_Params.put("vnp_IpAddr", Config.vnp_IpAddr); // Địa chỉ IP
        vnp_Params.put("vnp_OrderType", Config.orderType); // kiểu yêu cầu
        vnp_Params.put("vnp_Locale", Config.vnp_Locale); // vị trí

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate); // ngày tạo

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data - Tạo dữ liệu băm
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query - Tạo truy vấn
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString(); // đường dẫn truy vấn dưới dạng string
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString()); // băm SHA512
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash; // đường dẫn truy vấn được băm dưới dạng SHA512
        String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl; // Đường dẫn cuối , được tạo nên từ địa chỉ mặc định của VNPay và đường dẫn từ câu truy vấn được băm SHA512

          pay.put(vnp_TxnRef, paymentUrl);
        return pay;
    }

}
