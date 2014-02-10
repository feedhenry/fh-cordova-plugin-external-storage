package com.feedhenry.phonegap.externalstorage;

import java.io.File;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Environment;
import android.util.Log;

public class SandboxedExternalStorage extends CordovaPlugin {

  int vers = android.os.Build.VERSION.SDK_INT;
  
  @Override
  public boolean execute(String action, JSONArray args,
      CallbackContext callbackContext) throws JSONException {
    
    if ("enable".equals(action)) {
      JSONObject result = new JSONObject();
      try{
        result = enable();
        callbackContext.success(result);
      return true;
      }catch(StorageException e){
        result.put("message", e.getMessage());
        callbackContext.error(result);
      }
    }

    return false;
  }

  /**
   * 
   * @return JSONObject
   * @throws StorageException
   * @throws JSONException
   * 
   * calls the external storage api which enables it and returns a json object with the path to the storage area.
   * 
   */
  @SuppressLint("NewApi")
  public JSONObject enable() throws StorageException, JSONException {
    Context context   = cordova.getActivity().getApplicationContext();
    JSONObject result = new JSONObject();
    String state      = Environment.getExternalStorageState();
    
   
    if (Environment.MEDIA_MOUNTED.equals(state)) {
      // We can read and write the media
      File file = null;
      Log.d("version", String.format("%d",vers));
      if(vers <= 7){
        file = Environment.getExternalStorageDirectory();
        String appPackage = context.getPackageName();
        String path = file.getAbsolutePath() + "/Android/data/" + appPackage + "/files";
        result.put("path", path);
      }else{ 
        file = context.getExternalFilesDir(null);
        result.put("path", file.getAbsolutePath());
      }
      return result;
    } else if (Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
      throw new StorageException("Device is read only");
    } else {
      // Something else is wrong.
      throw new StorageException("Cannot read or write to the storage device. Current state : "+state );
    }
    
    
    
  }
  
  class StorageException extends Exception{
    
    private static final long serialVersionUID = 1L;

    public StorageException(String message) {
       super(message);
    }
  }

}
